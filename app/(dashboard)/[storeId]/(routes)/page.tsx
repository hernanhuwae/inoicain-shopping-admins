import { getChartProfit } from "@/action/get-chart-profit";
import { getSalesCount } from "@/action/get-sales-count";
import { getStockCount } from "@/action/get-stock-count";
import { getTotalProfit } from "@/action/get-total-profit";
import { Overview } from "@/components/overview-dashboar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { formatted } from "@/lib/utils";
import { Banknote, CreditCard, Package} from "lucide-react";

interface IDashboard{
    params:{storeId:string}
}

const DashboardPage: React.FC<IDashboard> = async({params}) => {

    const totalSales= await getTotalProfit(params.storeId)
    const salesCount= await getSalesCount(params.storeId)
    const stockCount = await getStockCount(params.storeId)
    const ProfitChart= await getChartProfit(params.storeId)

    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-5">
                <Heading title="Dashboard Store" desc="Statistic your sales"/>
                <Separator/>
                <div className="grid gap-4 grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-semibold">Total Profit</CardTitle>
                            <Banknote color="green" className="h-7 w-7"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatted.format(totalSales)}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-semibold">Sales</CardTitle>
                            <CreditCard color="blue" className="h-7 w-7"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {salesCount}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-semibold">Stock</CardTitle>
                            <Package color="red" className="h-7 w-7"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stockCount}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview Sales</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview data = {ProfitChart}/>
                    </CardContent>
                </Card>
            </div>
        </div>
     );
}
 
export default DashboardPage;