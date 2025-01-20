import { strict as assert } from 'assert';
import * as fs from 'fs'
import * as https from 'https'

const fetch = global['fetch']

async function readFile(filename: string) {
    return new Promise<Buffer>((resolve, reject) => {
        fs.readFile(filename, (error, result) => {
            if (error) { reject(error) } else { resolve(result) }
        })
    })
}

async function writeFile(filename: string, data: Buffer) {
    return new Promise<void>((resolve, reject) => {
        fs.writeFile(filename, data, (error) => {
            if (error) { reject(error) } else { resolve() }
        })
    })
}

export async function createAccount(username: string, password: string): Promise<{status: boolean, name: string, new_nfa: number}> {
    const response = await fetch('http://127.0.0.1:8080/create', {
        method: 'POST',
        body: `username=${ username }&password=${ password }`,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    })
    const text = await response.text()
    if (response.status !== 200) {
        throw new Error(`Unable to create user: ${ text }`)
    }    
    return JSON.parse(text);
}

export function convertAsset(asset: any, price: any): any {
    const base_amount = parseFloat(price.base.amount) / (10 ** price.base.precision);
    assert(base_amount > 0);
    const quote_amount = parseFloat(price.quote.amount) / (10 ** price.quote.precision);
    assert(quote_amount > 0);
    const asset_amount = parseFloat(asset.amount) / (10 ** asset.precision);

    // console.log(asset.fai);
    // console.log(price.base.fai);
    // console.log(price.quote.fai);

    if (asset.fai == price.base.fai) {
        return { 
            amount: Math.floor((asset_amount * quote_amount / base_amount) * 10 ** price.quote.precision),
            precision: price.quote.precision,
            fai: price.quote.fai
        }; 
    }
    else if (asset.fai == price.quote.fai) {
        return { 
            amount: Math.floor((asset_amount * base_amount / quote_amount) * 10 ** price.base.precision),
            precision: price.base.precision,
            fai: price.base.fai
        }; 
    } 
    else {
        throw new Error(`Can not convert ${ asset } with ${ price }`)
    }
}

function getLegacyAssetPrecision(symbol: string): number {
    switch (symbol) {
        case 'YANG':
        case 'YIN':
            return 3
        case 'QI':
        case 'GOLD':
        case 'FOOD':
        case 'WOOD':
        case 'FABR':
        case 'HERB':
            return 6
    }
}

function getLegacyAssetFai(symbol: string): string {
    switch (symbol) {
        case 'YANG':
            return "@@000000021"
        case 'QI':
            return "@@000000037"
        case 'GOLD':
        case 'FOOD':
        case 'WOOD':
        case 'FABR':
        case 'HERB':
        default:
            throw new Error(`Not implemented symbol: ${ symbol }`)
    }
}

function getLegacySymbolStringByFai(fai: string): string {
    switch (fai) {
        case '@@000000021':
            return "YANG"
        case '@@000000037':
            return "QI"
        default:
            throw new Error(`Not implemented fai: ${ fai }`)
    }
}

export function legacyStringToAssect(str: string): any {
    const [amountString, symbol] = str.split(' ')
    if (['YANG', 'QI', 'YIN', 'GOLD', 'FOOD', 'WOOD', 'FABR', 'HERB'].indexOf(symbol) === -1) {
        throw new Error(`Invalid asset symbol: ${ symbol }`)
    }
    const amount = Number.parseFloat(amountString)
    if (!Number.isFinite(amount)) {
        throw new Error(`Invalid asset amount: ${ amountString }`)
    }
    const precision = getLegacyAssetPrecision(symbol);
    return { 
        amount: Math.floor(amount * 10 ** precision).toString(),
        precision: precision,
        fai: getLegacyAssetFai(symbol)
    }
}

export function assetToLegacyString(asset: any): string {
    const amount = (Number.parseFloat(asset.amount) / (10 ** asset.precision)).toFixed(asset.precision);
    return `${amount} ${getLegacySymbolStringByFai(asset.fai)}`
}
