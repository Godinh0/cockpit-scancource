'use client'

import { useContext, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeContext } from '../components/Provider'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

function DashboardPage() {
    const theme = useContext(ThemeContext);
    const [vendor, setVendor] = useState('');
    const [category, setCategory] = useState('');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

    return (
        <>
            {/* Filtros */}
            <div className='flex gap-4 mt-5'>
                <Select onValueChange={setVendor}>
                    <SelectTrigger className='w-[200px]'>
                        <SelectValue placeholder="Select Vendor" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="vendor1">Vendor 1</SelectItem>
                        <SelectItem value="vendor2">Vendor 2</SelectItem>
                    </SelectContent>
                </Select>

                <Select onValueChange={setCategory}>
                    <SelectTrigger className='w-[200px]'>
                        <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="category1">Category 1</SelectItem>
                        <SelectItem value="category2">Category 2</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            
            {/* Tabela */}
            <Card className='mt-5 p-3 shadow-sm'>
                <CardContent>
            <div className='overflow-auto mt-5'>
                <Table >
                    <TableHeader>
                        <TableRow className='h-5 text-xs'>
                            <TableHead className='py-0 w-10 text-xs'>Vendor</TableHead>
                            <TableHead className='py-0 w-10 text-xs'>Category</TableHead>
                            <TableHead className='py-0 w-10 text-xs'>On Hand</TableHead>
                            <TableHead className='py-0 w-10 text-xs'>Giro Mês</TableHead>
                            <TableHead className='py-0 w-10 text-xs'>Dio Atual</TableHead>
                            <TableHead className='py-0 w-10 text-xs'>Dio Ideal</TableHead>
                            <TableHead className='py-0 w-16 text-xs'>Lead Time</TableHead>
                            {months.map((month) => (
                                <TableHead key={month} className=' w-32 text-left text-xs'>{month}
                                    <TableHead className='p-0 w-16 text-xs'>Back</TableHead>
                                    <TableHead className='py-0 w-16 text-xs'>Sugestão</TableHead>
                                    <TableHead className='py-0 w-16 text-xs'>Decisão</TableHead>
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...Array(5)].map((_, i) => (
                            <TableRow key={i}>
                                <TableCell className='py-0 w-10 text-xs'>Vendor {i + 1}</TableCell>
                                <TableCell className='py-0 w-10 text-xs'>Category {i + 1}</TableCell>
                                <TableCell className='py-0 w-10 text-xs'> {i + 1}</TableCell>
                                <TableCell className='py-0 w-10 text-xs'> {i + 1}</TableCell>
                                <TableCell className='py-0 w-10 text-xs'> {i + 1}</TableCell>
                                <TableCell className='py-0 w-10 text-xs'> {i + 1}</TableCell>
                                <TableCell className='py-0 w-10 text-xs'>
                                    <Input type="number" className='w-24' />
                                </TableCell>
                                {months.map((month) => (
                                    <>
                                    <TableCell className='py-0 w-10 text-xs'>
                                        <TableCell className='py-0 w-10 text-xs'> {i + 1}</TableCell>
                                        <TableCell className='py-0 w-10 text-xs'> {i + 1}</TableCell>                                        
                                        <TableCell key={month}>
                                            <Input type="number" className='w-20' />
                                        </TableCell>
                                    </TableCell>
                                    </>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            </CardContent>
            </Card>
        </>
    );
}

export default DashboardPage;