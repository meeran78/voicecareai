import React from 'react';
import Header from './_components/Header';

function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div>
        <Header />
        <div className='px-10 md:px-20 lg:px-40 xl:60 py-10'>
             {children}
        </div>
       </div>;
}

export default DashboardLayout;
