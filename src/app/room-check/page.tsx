'use client'

import Wrapper from '@/components/Wrapper'
import { BaseResp } from '@/types/BaseResp'
import { Room } from '@/types/Room'
import { RoomCheck, RoomCheckDetail } from '@/types/RoomCheck'
import { Site } from '@/types/Site'
import { Box, Button, Checkbox, FormControl, MenuItem, Select, SxProps, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'

const checkboxStyles: SxProps = {
    p: 0,
    '& .MuiSvgIcon-root': {
        fontSize: '2.5rem',
        '@media (max-width: 1920px)': {
            fontSize: '1.5rem'
        }
    }
}

const textfieldStyles: SxProps = {
    '& input': {
        fontSize: '2.5rem',
        '@media (max-width: 1920px)': {
            fontSize: '1rem'
        }
    }
}

const numberTextfieldStyles: SxProps = {
    '& input': {
        fontSize: '2.5rem',
        maxWidth: '10rem',
        '@media (max-width: 1920px)': {
            fontSize: '1rem',
            maxWidth: '5rem'
        }
    }
}

export default function RoomCheckPage() {
    const router = useRouter()
    const [siteList, setSiteList] = useState<Site[]>([])
    const [roomCheck, setRoomCheck] = useState<RoomCheck>({
        id: 0,
        site_id: 0,
        date: moment().format('YYYY-MM-DD'),
        detail: [],
        done_by_id: 0,
        verified_by_id: 0,
        is_verified: false
    })
    const [roomCheckDetailList, setRoomCheckDetailList] = useState<RoomCheckDetail[]>([])
    const [selectedSite, setSelectedSite] = useState<number>(0)

    useEffect(() => {
        getSite()
    }, [])

    useEffect(() => {
        if (selectedSite) {
            getRoom(selectedSite)
            setRoomCheck({
                ...roomCheck,
                site_id: selectedSite
            })
        }
    }, [selectedSite])

    useEffect(() => {
        if (roomCheckDetailList) {
            setRoomCheck({
                ...roomCheck,
                detail: roomCheckDetailList
            })
        }
    }, [roomCheckDetailList])

    useEffect(() => {
        window.sessionStorage.setItem('room-check-data', JSON.stringify(roomCheck))
    }, [roomCheck])

    const getSite = async () => {
        await fetch(`/api/site`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then((json: BaseResp) => {
                if (json.status === 200) {
                    setSiteList(json.data as Site[])
                }
            })
    }

    const getRoom = async (site_id: number) => {
        await fetch(`/api/room?site_id=${site_id}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then((json: BaseResp) => {
                if (json.status === 200) {
                    setRoomCheckDetailList((json.data as Room[]).map(room => ({
                        room_name: room.name,
                        light: false,
                        server_lock: false,
                        number_of_apars: 0,
                        apar_check: false,
                        floor: false,
                        glass: false,
                        wireless_phone: 0,
                        note: ''
                    })))
                }
            })
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement> | undefined, e2: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined, index: number) => {
        if (e) {
            setRoomCheckDetailList(old => old.map((room, index2) => {
                if (index === index2) {
                    return {
                        ...room,
                        [e.target.id]: e.target.checked
                    }
                }
                return { ...room }
            }))
        } else if (e2) {
            setRoomCheckDetailList(old => old.map((room, index2) => {
                if (index === index2) {
                    return {
                        ...room,
                        [e2.target.id]: e2.target.value
                    }
                }
                return { ...room }
            }))
        }
    }

    return <Wrapper>
        <Box
            sx={{
                height: '15vh',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
            }}
        >
            <Typography
                className='font-large font-bold'
            >
                Pengecekan Ruangan
            </Typography>
            <FormControl
                sx={{
                    minWidth: '15vw'
                }}
            >
                <Select
                    size='small'
                    labelId='site-label'
                    className='font-medium'
                    value={selectedSite}
                    onChange={(e) => setSelectedSite(e.target.value as number)}
                >
                    {siteList.map(value => (
                        <MenuItem value={value.id} key={value.id} className='font-medium'>{value.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
        <Box
            sx={{
                height: '75vh',
                overflow: 'auto',
                px: 2
            }}
        >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell rowSpan={2} className='font-medium'>Ruangan</TableCell>
                        <TableCell rowSpan={2} className='font-medium'>Lampu Menyala</TableCell>
                        <TableCell rowSpan={2} className='font-medium'>Rak Server Terkunci</TableCell>
                        <TableCell colSpan={2} className='font-medium'>Jumlah APAR</TableCell>
                        <TableCell colSpan={2} className='font-medium'>Kondisi</TableCell>
                        <TableCell rowSpan={2} className='font-medium'>Wireless Phone</TableCell>
                        <TableCell rowSpan={2} className='font-medium'>Keterangan</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className='font-medium'>Default</TableCell>
                        <TableCell className='font-medium'>Check</TableCell>
                        <TableCell className='font-medium'>Lantai</TableCell>
                        <TableCell className='font-medium'>Kaca</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {roomCheckDetailList.map((value, index) => (
                        <TableRow key={value.room_name}>
                            <TableCell className='font-medium'>{value.room_name}</TableCell>
                            <TableCell className='text-center'>
                                <Checkbox
                                    id='light'
                                    checked={value.light}
                                    onChange={(e) => handleOnChange(e, undefined, index)}
                                    sx={checkboxStyles}
                                />
                            </TableCell>
                            <TableCell className='text-center'>
                                <Checkbox
                                    id='server_lock'
                                    checked={value.server_lock}
                                    onChange={(e) => handleOnChange(e, undefined, index)}
                                    sx={checkboxStyles}
                                />
                            </TableCell>
                            <TableCell className='text-center'>
                                <TextField
                                    id='number_of_apars'
                                    type='number'
                                    size='small'
                                    value={value.number_of_apars}
                                    onChange={(e) => handleOnChange(undefined, e, index)}
                                    sx={numberTextfieldStyles}
                                />
                            </TableCell>
                            <TableCell className='text-center'>
                                <Checkbox
                                    id='apar_check'
                                    checked={value.apar_check}
                                    onChange={(e) => handleOnChange(e, undefined, index)}
                                    sx={checkboxStyles}
                                />
                            </TableCell>
                            <TableCell className='text-center'>
                                <Checkbox
                                    id='floor'
                                    checked={value.floor}
                                    onChange={(e) => handleOnChange(e, undefined, index)}
                                    sx={checkboxStyles}
                                />
                            </TableCell>
                            <TableCell className='text-center'>
                                <Checkbox
                                    id='glass'
                                    checked={value.glass}
                                    onChange={(e) => handleOnChange(e, undefined, index)}
                                    sx={checkboxStyles}
                                />
                            </TableCell>
                            <TableCell className='text-center'>
                                <TextField
                                    id='wireless_phone'
                                    type='number'
                                    size='small'
                                    value={value.wireless_phone}
                                    onChange={(e) => handleOnChange(undefined, e, index)}
                                    sx={numberTextfieldStyles}
                                />
                            </TableCell>
                            <TableCell className='text-center'>
                                <TextField
                                    id='note'
                                    size='small'
                                    value={value.note}
                                    onChange={(e) => handleOnChange(undefined, e, index)}
                                    sx={textfieldStyles}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
        <Box
            sx={{
                height: '10vh',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Box>
                <Button
                    variant='contained'
                    sx={{
                        display: 'inline'
                    }}
                    className='font-medium'
                    onClick={() => router.push('room-check/pdf')}
                >
                    Cetak
                </Button>
            </Box>
        </Box>
    </Wrapper>
}