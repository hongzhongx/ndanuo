// Control Characters
export const BEEP = "\x07"; /* Beep Sound BEL(\a) */
export const ESC = "\x1b"; /* Escape ESC(\e | \x1b) */
// Escape Sequences
export const CSI = ESC + "["; /* Control Sequence Introducer */
// CSI Color Sequences
export const SGR: (x:string) => string = (x) => CSI + x + "m";  /* ANSI color code (Select Graphic Rendition) */
export const FCC: (x:string) => string = (x) => CSI + "38;5;" + x + "m";  /* Foreground 256 color code */
export const BCC: (x:string) => string = (x) => CSI + "48;5;" + x + "m";  /* Background 256 color code */
export const RGB: (r:string, g:string, b:string) => string = (r,g,b) => CSI + "38;2;" + r + ";" + g + ";" + b + "m";  /* Foreground 24 bit rgb color code */
export const BRGB:(r:string, g:string, b:string) => string = (r,g,b) => CSI + "48;2;" + r + ";" + g + ";" + b + "m"; /* Background 24 bit rgb color code */

/* Foreground Colors 30 ~ 37 */

export const BLK = SGR("30");  /* 黑 */
export const RED = SGR("31");  /* 紅 */
export const GRN = SGR("32");  /* 綠 */
export const YEL = SGR("33");  /* 黃 */
export const BLU = SGR("34");  /* 藍 */
export const MAG = SGR("35");  /* 紫 */
export const CYN = SGR("36");  /* 青 */
export const WHT = SGR("37");  /* 白 */
export const FNOR = SGR("39"); /* 默认前景色 */

/* Hi Intensity Foreground Colors 90 ~ 97 */

export const HIK = SGR("1;30"); /* 灰 */
export const HIR = SGR("1;31"); /* 紅 */
export const HIG = SGR("1;32"); /* 綠 */
export const HIY = SGR("1;33"); /* 黃 */
export const HIB = SGR("1;34"); /* 藍 */
export const HIM = SGR("1;35"); /* 紫 */
export const HIC = SGR("1;36"); /* 青 */
export const HIW = SGR("1;37"); /* 白 */

/* Background Colors 40 ~ 47 */

export const BBLK = SGR("40"); /* 黑 */
export const BRED = SGR("41"); /* 紅 */
export const BGRN = SGR("42"); /* 綠 */
export const BYEL = SGR("43"); /* 黃 */
export const BBLU = SGR("44"); /* 藍 */
export const BMAG = SGR("45"); /* 紫 */
export const BCYN = SGR("46"); /* 青 */
export const BWHT = SGR("47"); /* 白 */
export const BNOR = SGR("49"); /* 默认背景色 */

/* High Intensity Background Colors 100 ~ 107 */

export const HBBLK = SGR("1;40"); /* 灰 */
export const HBRED = SGR("1;41"); /* 紅 */
export const HBGRN = SGR("1;42"); /* 綠 */
export const HBYEL = SGR("1;43"); /* 黃 */
export const HBBLU = SGR("1;44"); /* 藍 */
export const HBMAG = SGR("1;45"); /* 紫 */
export const HBCYN = SGR("1;46"); /* 青 */
export const HBWHT = SGR("1;47"); /* 白 */

// export const NOR = ESC + "[m"   /* Puts everything back to normal */
export const NOR = SGR("0");     /* 清除所有特殊属性 */
export const BOLD = SGR("1");    /* Turn on BOLD mode */
export const ITALIC = SGR("3");  /* Turn on ITALIC mode */
export const U = SGR("4");       /* Initialize underscore mode */
export const BLINK = SGR("5");   /* Initialize blink mode */
export const REV = SGR("7");     /* Turns reverse video mode on */
export const HIREV = SGR("1;7"); /* Hi intensity reverse video  */
export const HIDDEN = SGR("8");  /* 消隐(部分客户端不支持) */
export const STRIKE = SGR("9");  /* Display text as strikethrough */
export const BOFF = SGR("21");   /* BOLD OFF */
export const IOFF = SGR("23");   /* ITALIC OFF */
export const UOFF = SGR("24");   /* UNDERLINE OFF */
export const ROFF = SGR("27");   /* Reverse OFF */

/* Additional ansi Esc codes added to ansi.h by Gothic  april 23,1993 */
/* Note, these are Esc codes for VT100 terminals, and emmulators */
/*          and they may not all work within the mud             */
export const ICH: (n:string) => string = (n) => CSI + n + "@"; /* Insert n blank characters*/
export const CUU: (n:string) => string = (n) => CSI + n + "A"; /* （Cursor Up）光标向上移动n（默认1）格。如果光标已在屏幕边缘，则无效 */
export const CUD: (n:string) => string = (n) => CSI + n + "B"; /* （Cursor Down）光标向下移动n（默认1）格。如果光标已在屏幕边缘，则无效 */
export const CUF: (n:string) => string = (n) => CSI + n + "C"; /* （Cursor Forward）光标向右移动n（默认1）格。如果光标已在屏幕边缘，则无效 */
export const CUB: (n:string) => string = (n) => CSI + n + "D"; /* （Cursor Back）光标向左移动n（默认1）格。如果光标已在屏幕边缘，则无效 */
export const CNL: (n:string) => string = (n) => CSI + n + "E"; /* （Cursor Next Line）光标移动到下面第n（默认1）行的开头 */
export const CPL: (n:string) => string = (n) => CSI + n + "F"; /* （Cursor Previous Line）光标移动到上面第n（默认1）行的开头 */
export const CHA: (n:string) => string = (n) => CSI + n + "G"; /* （Cursor Horizontal Absolute）光标水平移动到第n（默认1）列 */
export const CUP: (x:string, y:string) => string = (x, y) => CSI + x + ";" + y + "H"; /* （Cursor Position）將 cursor 移至第 x 行第 y 列 */
export const ED: (n:string) => string = (n) => CSI + n + "J" ; /* （Erase Display）0 erase from cursor to end of display, 1 erase from start of display to cursor, 2 erase display*/
export const EL: (n:string) => string = (n) => CSI + n + "K" ; /* （Erase Line）0 erase from cursor to end of line, 1 erase from start of line to cursor, 2 erase line*/
export const IL: (n:string) => string = (n) => CSI + n + "L" ; /* Insert n blank lines*/
export const DL: (n:string) => string = (n) => CSI + n + "M" ; /* Delete n lines*/
export const DCH: (n:string) => string = (n) => CSI + n + "P"; /* Delete n characters*/
export const SPU: (n:string) => string = (n) => CSI + n + "S"; /* Scroll whole page up by n (default 1) lines. */
export const SPD: (n:string) => string = (n) => CSI + n + "T"; /* Scroll whole page down by n (default 1) lines. */
export const ECH: (n:string) => string = (n) => CSI + n + "X"; /* Erase n characters*/
export const HOME = CSI + "H"; /* Send cursor to home position */
export const CLR = CSI + "2J"; /* Clear the screen  */
export const ECL = CSI + "2K"; /* Erase entire line. Cursor position does not change. */
export const REF = CLR + HOME; /* Clear screen and home cursor */
export const FREEZE: (x:string, y:string) => string = (x, y) => CSI + x + ";" + y + "r"; /* Freeze 住從 x 到 y 這幾行作為 screen */
export const FRTOP = CSI + "2;25r"; /* Freeze top line */
export const FRBOT = CSI + "1;24r"; /* Freeze bottom line */
export const UNFR = CSI + "r"; /* Unfreeze top and bottom lines */
export const SAVEC = CSI + "s"; /* Save cursor position */
export const RESTC = CSI + "u"; /* Restore cursor to saved position */

export const REVINDEX = ESC + "M"; /* Scroll screen in opposite direction */
export const BIGTOP = ESC + "#3";  /* Dbl height characters, top half */
export const BIGBOT = ESC + "#4";  /* Dbl height characters, bottem half */
export const SINGW = ESC + "#5"; /* Normal, single-width characters */
export const DBL = ESC + "#6";     /* Creates double-width characters */
export const DECALN = ESC + "#8";  /* DEC 屏幕校准测试 - 以E填充屏幕 */

// 清理ANSI色彩标记
function remove_ansi(arg:string) : string
{
    arg = arg.replaceAll(BLK, "");
    arg = arg.replaceAll(RED, "");
    arg = arg.replaceAll(GRN, "");
    arg = arg.replaceAll(YEL, "");
    arg = arg.replaceAll(BLU, "");
    arg = arg.replaceAll(MAG, "");
    arg = arg.replaceAll(CYN, "");
    arg = arg.replaceAll(WHT, "");
    arg = arg.replaceAll(HIR, "");
    arg = arg.replaceAll(HIG, "");
    arg = arg.replaceAll(HIY, "");
    arg = arg.replaceAll(HIB, "");
    arg = arg.replaceAll(HIM, "");
    arg = arg.replaceAll(HIC, "");
    arg = arg.replaceAll(HIW, "");
    arg = arg.replaceAll(NOR, "");
    arg = arg.replaceAll(BOLD, "");
    arg = arg.replaceAll(BLINK, "");
    arg = arg.replaceAll(BBLK, "");
    arg = arg.replaceAll(BRED, "");
    arg = arg.replaceAll(BGRN, "");
    arg = arg.replaceAll(BYEL, "");
    arg = arg.replaceAll(BBLU, "");
    arg = arg.replaceAll(BMAG, "");
    arg = arg.replaceAll(BCYN, "");
    arg = arg.replaceAll(HBRED, "");
    arg = arg.replaceAll(HBGRN, "");
    arg = arg.replaceAll(HBYEL, "");
    arg = arg.replaceAll(HBBLU, "");
    arg = arg.replaceAll(HBMAG, "");
    arg = arg.replaceAll(HBCYN, "");
    arg = arg.replaceAll(HBWHT, "");
    arg = arg.replaceAll(HIDDEN, "");

    return arg;
}

// 转义&ANSI码&为ANSI色彩输出
export function ansi(content:string) : string
{
    if (content == "")
        return "";
    
    // Foreground color
    content = content.replaceAll("&BLK&", BLK);
    content = content.replaceAll("&RED&", RED);
    content = content.replaceAll("&GRN&", GRN);
    content = content.replaceAll("&YEL&", YEL);
    content = content.replaceAll("&BLU&", BLU);
    content = content.replaceAll("&MAG&", MAG);
    content = content.replaceAll("&CYN&", CYN);
    content = content.replaceAll("&HIK&", HIK);
    content = content.replaceAll("&WHT&", WHT);
    content = content.replaceAll("&HIR&", HIR);
    content = content.replaceAll("&HIG&", HIG);
    content = content.replaceAll("&HIY&", HIY);
    content = content.replaceAll("&HIB&", HIB);
    content = content.replaceAll("&HIM&", HIM);
    content = content.replaceAll("&HIC&", HIC);
    content = content.replaceAll("&HIW&", HIW);
    content = content.replaceAll("&NOR&", NOR);
    
    // Background color
    content = content.replaceAll("&BBLK&", BBLK);
    content = content.replaceAll("&BRED&", BRED);
    content = content.replaceAll("&BGRN&", BGRN);
    content = content.replaceAll("&BYEL&", BYEL);
    content = content.replaceAll("&BBLU&", BBLU);
    content = content.replaceAll("&BMAG&", BMAG);
    content = content.replaceAll("&BCYN&", BCYN);
    content = content.replaceAll("&HBRED&", HBRED);
    content = content.replaceAll("&HBGRN&", HBGRN);
    content = content.replaceAll("&HBYEL&", HBYEL);
    content = content.replaceAll("&HBBLU&", HBBLU);
    content = content.replaceAll("&HBMAG&", HBMAG);
    content = content.replaceAll("&HBCYN&", HBCYN);
    
    content = content.replaceAll("&U&", U);
    content = content.replaceAll("&BLINK&", BLINK);
    content = content.replaceAll("&REV&", REV);
    content = content.replaceAll("&HIREV&", HIREV);
    content = content.replaceAll("&BOLD&", BOLD);
    content = content.replaceAll("&HIDDEN&", HIDDEN);

    return content;
}

// calculate the color char in a string
function color_len(str: string) : number
{
    let extra = 0;
    for (let i = 0; i < str.length; i++)
    {
        if (str[i] == ESC[0])
        {
            while ((extra++, str[i] != 'm') && i < str.length)
                i++;
        }
    }
    return extra;
}

function color_to_html(msg : string) : string
{
    if (msg == "")
        return "";
    
    msg = msg.replaceAll(BLK, "<span style=\"color: #000000\">");
    msg = msg.replaceAll(RED, "<span style=\"color: #990000\">");
    msg = msg.replaceAll(GRN, "<span style=\"color: #009900\">");
    msg = msg.replaceAll(YEL, "<span style=\"color: #999900\">");
    msg = msg.replaceAll(BLU, "<span style=\"color: #000099\">");
    msg = msg.replaceAll(MAG, "<span style=\"color: #990099\">");
    msg = msg.replaceAll(CYN, "<span style=\"color: #669999\">");
    msg = msg.replaceAll(WHT, "<span style=\"color: #EEEEEE\">");
    
    msg = msg.replaceAll(HIK, "<span style=\"color: #BBBBBB\">");
    msg = msg.replaceAll(HIR, "<span style=\"color: #FF0000\">");
    msg = msg.replaceAll(HIG, "<span style=\"color: #00FF00\">");
    msg = msg.replaceAll(HIY, "<span style=\"color: #FFFF00\">");
    msg = msg.replaceAll(HIB, "<span style=\"color: #0000FF\">");
    msg = msg.replaceAll(HIM, "<span style=\"color: #FF00FF\">");
    msg = msg.replaceAll(HIC, "<span style=\"color: #00FFFF\">");
    msg = msg.replaceAll(HIW, "<span style=\"color: #FFFFFF\">");
    
    msg = msg.replaceAll(BBLK, "<span style=\"background-color: #FFFF00\">");
    msg = msg.replaceAll(BRED, "<span style=\"background-color: #990000\">");
    msg = msg.replaceAll(BGRN, "<span style=\"background-color: #009900\">");
    msg = msg.replaceAll(BYEL, "<span style=\"background-color: #999900\">");
    msg = msg.replaceAll(BBLU, "<span style=\"background-color: #000099\">");
    msg = msg.replaceAll(BMAG, "<span style=\"background-color: #990099\">");
    msg = msg.replaceAll(BCYN, "<span style=\"background-color: #669999\">");
    msg = msg.replaceAll(BWHT, "<span style=\"background-color: #EEEEEE\">");
    
    msg = msg.replaceAll(NOR, "</span>");
    msg = msg.replaceAll(U, "<span>");
    msg = msg.replaceAll(BLINK, "<span>");
    msg = msg.replaceAll(REV, "<span>");

    return msg
}
