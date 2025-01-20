import express, { Express, RequestHandler } from 'express';
import bodyParser from 'body-parser';
import * as readline from 'readline';
import { ansi, NOR } from './ansi';
import { createAccount, convertAsset, legacyStringToAssect, assetToLegacyString } from "./common";

let taiyi = require('@taiyinet/taiyi-js');
taiyi.api.setOptions({ 
	url: 'ws://127.0.0.1:8090',
	chain_id: "18dcf0a285365fc58b71f18b3d3fec954aa0c141c44e4e5cb4cf777b9eab274e"
});

console.log("-- 大傩实验客户端 --");

const app: Express = express();
app.use(bodyParser.json() as RequestHandler);
app.use(bodyParser.urlencoded({ extended: false }) as RequestHandler);
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

let account_name = "";
let account_wif = "";
let play_nfa = null;

function die(msg) { process.stderr.write(msg+'\n'); process.exit(1) }

///////////////////////////////////////////////////////////////////////////////

const args = require('minimist')(process.argv.slice(2));

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('请使用账号密码进行登录，命令是“login 账号名 密码”。');
 
rl.on('line', async (input) => {
    if (input.trim() === 'exit') {
        rl.close(); // 输入 'exit' 时退出循环
    } 
    else {
        let args = input.split(/\s+/);
        // console.log(`解析输入：${args}`);
        let action = args[0];
        
        if(action == "login") {
            account_name = args[1];
            const approving_account_objects = await taiyi.api.getAccountsAsync( [account_name] );
            if( approving_account_objects.length == 0 || approving_account_objects[0].name == null) {
                console.warn(`账号${account_name}不存在，你可以使用命令“signup 账号名 账号密码”创建新账号。`);
                return;
            }

            let pass = args[2];
            const keys = taiyi.auth.generateKeys(account_name, pass, ['posting', 'active', 'owner', 'memo']);

            const approving_acct = approving_account_objects[0];
            if(keys.active != approving_acct.active.key_auths[0][0]) {
                console.warn(`你的密码对该账号无效，请重新登录。`);
                return;
            }

            account_wif = taiyi.auth.getPrivateKeys(account_name, pass).active; //在本地仅缓存了active私钥
            console.log('登录成功。');
            console.log('请选择角色，命令是“play 角色名称|NFA序号”。');
            console.log('如果要创建新角色，命令是“new 角色姓氏 角色名”。');
            return;
        }

        if(action == "signup") {
            account_name = args[1];
            let pass = args[2];
            try {
                console.log(`正在创建账号"${account_name}"中…`);
                const s = await createAccount(account_name, pass);
                if(s.status == true) {
                    let results = await taiyi.api.evalNfaActionWithStringArgsAsync(s.new_nfa, "show_name", "[]");
                    const nfa = await taiyi.api.findNfaAsync(s.new_nfa);
                    console.log(`创建账号${account_name}成功，系统还赠送了一个法宝${results[0]}（NFA序号=#${s.new_nfa}）。`);

                    const [newAcc] = await taiyi.api.getAccountsAsync([account_name]);
                    console.log(`${account_name}真气量为${newAcc.qi}`);

                    console.log(`请使用login命令登录账号。`);
                }
                else
                    console.log(`创建账号${account_name}失败了！`);
            }
            catch(err) {
                console.log(err.toString());
                if(err.payload)
                    console.log(err.payload);
                console.log(`创建账号${account_name}失败了！`);
            };    
            return;
        }
        
        if(account_name == "" || account_wif == "") {
            console.log('请使用账号密码进行登录，命令是“login 账号名 密码”。');
            return;
        }
        
        if(action == "new") {
            // new 角色姓氏 角色名
            let family_name = args[1];
            let last_name = args[2];
            try {
                const cfg = await taiyi.api.getConfigAsync();
                const chainProps = await taiyi.api.getChainPropertiesAsync()
                const fee = legacyStringToAssect(chainProps.account_creation_fee);
                const qi_fee = convertAsset(fee, cfg.TAIYI_QI_SHARE_PRICE);
                await taiyi.broadcast.createActorAsync(
                    account_wif,
                    assetToLegacyString(qi_fee),
                    account_name,
                    family_name,
                    last_name
                )
            }
            catch(err) {
                console.log(err.toString());
                if(err.payload)
                    console.log(JSON.stringify(err.payload));
                console.log(`创建角色失败了！`);
                return;
            };

            console.log(`创建角色${family_name}${last_name}成功，请使用play命令开始游戏。`);
            return;
        }

        if(action == "play") {
            if(isInteger(args[1])) {
                play_nfa = parseInt(args[1], 10);
                console.log(`你好，现在你已经是NFA#${play_nfa}。`);
            }
            else {
                let actor_name = args[1];
                console.log(actor_name)
                const actor_info = await taiyi.api.findActorAsync(actor_name);
                if(actor_info == null)
                    console.warn(`角色${actor_name}不存在。`);
                else {
                    play_nfa = actor_info.nfa_id;
                    console.log(`你好，${actor_name}。`);
                }
            }

            return;
        }

        if(play_nfa == "") {
            console.log('请选择角色或者NFA，命令是“play 角色名称|NFA序号”。');
            return;
        }

        // 开始对nfa执行命令
        try {
            // 重新按action命令格式解析输入为[命令字符串, 参数字符串]
            args = splitInputAsAction(input);
            let params = args[1];

            const info = await taiyi.api.getNfaActionInfoAsync(play_nfa, action);
            let results = [];
            if(info.consequence == true) {
                const tx = await taiyi.broadcast.actionNfaAsync(
                    account_wif,
                    account_name,
                    play_nfa,
                    action,
                    [],
                    [params]   
                )
                const tx_result = await taiyi.api.getTransactionResultsAsync(tx.id);
                tx_result.forEach( (result) => {
                    // console.log(JSON.stringify(result));
                    if(result.type == "contract_result") {
                        let cresult = result.value;
                        cresult.contract_affecteds.forEach( (affect) => {
                            if(affect.type == "contract_logger") {
                                results.push(affect.value.message);
                            }
                        });
                    }
                });
            }
            else {
                results = await taiyi.api.evalNfaActionWithStringArgsAsync(play_nfa, action, params);
            }

            let ss = "";
            results.forEach( (result) => {
                ss += result + "\n" + NOR;
            });
            ss += "\n" + NOR;

            ss = ansi(ss);
            console.log(ss);

        }
        catch(err) {
            console.log(err.toString());
            console.log(err.payload);
        };
    }
});
 
rl.on('close', () => {
    console.log('再见！');
    process.exit(0); // 退出程序
});

///////////////////////////////////////////////////////////////////////////////
function isInteger(str) {
    const num = parseInt(str, 10);
    return !isNaN(num) && isFinite(num) && Number.isInteger(num);
}

function splitInputAsAction(input: string): string[] {
    // 使用正则表达式匹配第一个空格前的内容和之后的内容
    const match = input.match(/^([^ ]+) (.+)$/);
    
    if (match) {
        return [match[1], match[2]];
    } else {
        throw new Error("输入格式错误，请重新输入！");
    }
}