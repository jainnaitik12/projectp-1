import { useLocation } from 'react-router-dom';
import { AdminThemeProvider } from '../../contexts/admin/AdminThemeContext';
import { AdminLayoutProvider } from '../../contexts/admin/AdminLayoutContext';
// import { StudentThemeProvider } from '../../contexts/student/StudentThemeContext';
// import { StudentLayoutProvider } from '../../contexts/student/StudentLayoutContext';
// import { CompanyThemeProvider } from '../../contexts/company/CompanyThemeContext';
// import { CompanyLayoutProvider } from '../../contexts/company/CompanyLayoutContext';
import AdminLayoutContent from './admin/AdminLayoutContent';
// import StudentLayoutContent from './student/StudentLayoutContent';
// import CompanyLayoutContent from './company/CompanyLayoutContent';

const MainLayout = () => {
    const location = useLocation();
    const path = location.pathname;

    // Admin Section
    if (path.startsWith('/admin')) {
        return (
            <AdminThemeProvider>
                <AdminLayoutProvider>
                    <AdminLayoutContent />
                </AdminLayoutProvider>
            </AdminThemeProvider>
        );
    }

    // Student Section
    // if (path.startsWith('/student')) {
    //     return (
    //         <StudentThemeProvider>
    //             <StudentLayoutProvider>
    //                 <StudentLayoutContent />
    //             </StudentLayoutProvider>
    //         </StudentThemeProvider>
    //     );
    // }

    // // Company Section
    // if (path.startsWith('/company')) {
    //     return (
    //         <CompanyThemeProvider>
    //             <CompanyLayoutProvider>
    //                 <CompanyLayoutContent />
    //             </CompanyLayoutProvider>
    //         </CompanyThemeProvider>
    //     );
    // }

    // Default or error case
    return <div>Invalid Route</div>;
};

export default MainLayout; 