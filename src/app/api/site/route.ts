import { BaseResp } from '@/types/BaseResp'
import { Site } from '@/types/Site'
import fetchSql from '@/utils/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        const query = await fetchSql(`SELECT * FROM site ORDER BY name ASC`)
        const site: Site[] = query.rows as Site[]
        const result: BaseResp = {
            status: 200,
            message: 'OK',
            data: site
        }
        return NextResponse.json(result)
    } catch (err) {
        console.error('Error:', err)
        const error: BaseResp = {
            status: 500,
            message: 'Internal Server Error'
        }
        return NextResponse.json(error, { status: 500 })
    }
}