'use client'

import { useContext, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeContext } from '../components/Provider'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

function DashboardPage() {
    const theme = useContext(ThemeContext);
    const [vendor, setVendor] = useState('All');
    const [category, setCategory] = useState('All');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

    const data = [
        { vendor: 'Vendor 1', category: 'Category 1', values: Array(7).fill(228) },
        { vendor: 'Vendor 1', category: 'Category 2', values: Array(7).fill(228) },
        { vendor: 'Vendor 2', category: 'Category 1', values: Array(7).fill(228) },
        { vendor: 'Vendor 2', category: 'Category 2', values: Array(7).fill(228) },
    ];

    const filteredData = data.filter(item => 
        (vendor === 'All' || item.vendor === vendor) &&
        (category === 'All' || item.category === category)
    );

    return (
        <>
            {/* Filtros */}
            <div className='flex gap-4 mt-5'>
                <Select onValueChange={setVendor} value={vendor}>
                    <SelectTrigger className='w-[200px]'>
                        <SelectValue placeholder="Select Vendor" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Vendor 1">Vendor 1</SelectItem>
                        <SelectItem value="Vendor 2">Vendor 2</SelectItem>
                    </SelectContent>
                </Select>

                <Select onValueChange={setCategory} value={category}>
                    <SelectTrigger className='w-[200px]'>
                        <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Category 1">Category 1</SelectItem>
                        <SelectItem value="Category 2">Category 2</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            
            {/* Tabelas dentro do mesmo Card */}
            <Card className='mt-5 p-3 shadow-sm'>
                <CardContent className='flex'>
                    {/* Tabela Fixa */}
                    <div className='w-[800px] mt-5'>
                        <Table>
                            <TableHeader>
                                <TableRow className='h-5 text-xs'>
                                    <TableHead className='py-0 w-20 text-xs'>Vendor</TableHead>
                                    <TableHead className='py-0 w-32 text-xs'>Category</TableHead>
                                    <TableHead className='py-0 w-10 text-xs'>On Hand</TableHead>
                                    <TableHead className='py-0 w-10 text-xs'>Giro Mês</TableHead>
                                    <TableHead className='py-0 w-10 text-xs'>Dio Atual</TableHead>
                                    <TableHead className='py-0 w-10 text-xs'>Dio Ideal</TableHead>
                                    <TableHead className='py-0 w-16 text-xs'>Lead Time</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredData.map((item, i) => (
                                    <TableRow key={i}>
                                        <TableCell className='py-0 text-xs'>{item.vendor}</TableCell>
                                        <TableCell className='py-0 text-xs'>{item.category}</TableCell>
                                        <TableCell className='py-0 text-xs'> 228</TableCell>
                                        <TableCell className='py-0 text-xs'> 228</TableCell>
                                        <TableCell className='py-0 text-xs'> 228</TableCell>
                                        <TableCell className='py-0 text-xs'> 228</TableCell>
                                        <TableCell className='py-0 text-xs'>
                                            <Input type="number" className='w-16' />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    
                    {/* Tabela com Scroll */}
                    <div className='flex-1 overflow-x-auto ml-4 pr-10'>
                        <Table>
                            <TableHeader>
                                <TableRow className='h-5 text-xs'>
                                    {months.map((month) => (
                                        <TableHead key={month} className='w-32 text-left text-xs'>{month}
                                            <TableHead className='p-0 w-16 text-xs'>Back</TableHead>
                                            <TableHead className='py-0 w-16 text-xs'>Sugestão</TableHead>
                                            <TableHead className='py-0 w-16 text-xs'>Decisão</TableHead>
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredData.map((item, i) => (
                                    <TableRow key={i}>
                                        {months.map((month) => (
                                            <TableCell key={month} className='py-0 w-32 text-xs'>
                                                <TableCell className='py-0 w-10 text-xs'> 228</TableCell>
                                                <TableCell className='py-0 w-10 text-xs'> 228</TableCell>                                        
                                                <TableCell className='py-0 w-10 text-xs'>
                                                    <Input type="number" className='w-16' />
                                                </TableCell>
                                            </TableCell>
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
