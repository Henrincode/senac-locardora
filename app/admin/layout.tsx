import AsideBarAdmin from "./_components/AsideBarAdmin";
import NavBarAdm from "./_components/NavBarAdm";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    return (
        <>
            <NavBarAdm />
            <main className="pt-20">{children}</main>
        </>
    )
}