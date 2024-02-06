import DashboardHeader from "@/components/DashBoard/dashboard-header";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode
}) {
    return <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip z-100">
        <DashboardHeader />
        {children}
    </div>
}