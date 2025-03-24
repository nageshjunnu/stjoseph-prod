import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import StudentDashboard from '../students/StudentDashboard';
import Link from 'next/link';

const Dashboard = () => {
    const router = useRouter();
    console.log(router, "router")
    const { token, sessionKey } = router.query;
    const [session, setSession] = useState("");
    const [tokenv, setToken] = useState("");
    const [hasPermission, setHasPermission] = useState(null);
    const [studentData, setStudentData] = useState(null); // State to store API response
    const [hasPkey, setHasPkey] = useState(false);
    // // Redirect to login page if query data is not available
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const tokens = localStorage.getItem('token');
            setToken(tokens);
            if (token === null || token === "") {
                // console.log(token, "=session")
                router.push('/');
            }
        }
    }, [tokenv]);
    useEffect(() => {
        if (typeof window !== "undefined") {
            const usersData = JSON.parse(localStorage.getItem("usersData"));
            if (usersData) {
                if (usersData.data.pkey) {
                    setHasPkey(true);
                }
            }
        }
    }, []);
    // Render loading or dashboard content based on query data availability

    useEffect(() => {
        // Function to fetch data from API
        const fetchData = async () => {
            try {
                const response = await axios.get('https://kyroes.in/st-josephs/api/student-stats/');
                setStudentData(response.data); // Update state with API response
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call fetchData function when component mounts
    }, []); // Empty dependency array ensures useEffect runs only once

    // Function to render degree items dynamically
    // const renderDegreeItems = () => {
    //     if (!studentData) return null; // Return null if data is not fetched yet
    //     const colors = [
    //     'bg-primary-light', 'bg-secondary-light', 'bg-success-light',
    //     'bg-info-light', 'bg-warning-light', 'bg-danger-light',
    //     'bg-dark-light', 'bg-light-light'
    // ];
    //     return studentData.category_counts.map((degree, index) => (
    //         <div className="col-lg-4 col-12" key={index}>
    //             <Link href="#" className="box pull-up">
    //                 <div className="box-body">
    //                     <div className="d-flex align-items-center">
    //                         <div className="icon bg-primary-light rounded-circle w-60 h-60 text-center l-h-80">
    //                             <span className="fs-30 icon-Bulb1">
    //                                 <span className="path1"></span>
    //                                 <span className="path2"></span>
    //                                 <span className="path3"></span>
    //                                 <span className="path4"></span>
    //                             </span>
    //                         </div>
    //                         <div className="ms-15">
    //                             <h5 className="mb-0">{degree.degree}</h5>
    //                             <p className="text-fade fs-12 mb-0">Count: {degree.count}</p>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </Link>
    //         </div>
    //     ));
    // }
    useEffect(() => {
        if (typeof window !== "undefined") {
            const usersData = JSON.parse(localStorage.getItem("usersData"));
                if (usersData.data.permission) {
                    setHasPermission(usersData.data.permission);
                }
        }
    }, []);
    const renderDegreeItems = () => {
        if (!studentData) return null; // Return null if data is not fetched yet
    
        const colors = [
            '#4accdb', '#2ab42a', '#ec5020', '#db4ac3', '#604adb'
        ];
    
        return studentData.category_counts.slice(0, 5).map((degree, index) => {
            const color = colors[index]; // Get the fixed color for the index
    
            return (
                <div className="col-lg-4 col-12" key={index}>
                    <Link href="/students" className={`box pull-up`} style={{ backgroundColor: color }}>
                        <div className={`box-body box-body2`} style={{ backgroundColor: color }}>
                            <div className="d-flex align-items-center">
                                <div className={`icon rounded-circle w-60 h-60 text-center l-h-80`}>
                                    <span className="fs-30 icon-Bulb1">
                                        <span className="path1"></span>
                                        <span className="path2"></span>
                                        <span className="path3"></span>
                                        <span className="path4"></span>
                                    </span>
                                </div>
                                <div className="ms-15">
                                    <h5 className="mb-0">{degree.degree}</h5>
                                    <p className="text-fade fs-12 mb-0">Count: {degree.count}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            );
        });
    }
    
    
    
    
    if (!studentData) return null;
    const colors = [
        '#4accdb', '#2ab42a', '#ec5020', '#db4ac3', '#604adb'
    ];
    
    // Ensure the colors array covers all degrees if there are more than 5
    const barColors = studentData.category_counts.map((_, index) => colors[index % colors.length]);
    
    const data = {
        labels: studentData.category_counts.map(degree => degree.degree),
        datasets: [
            {
                label: 'Degree Count',
                data: studentData.category_counts.map(degree => degree.count),
                fill: false,
                backgroundColor: barColors,
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1,
                borderWidth: 1,
                barThickness: 20, // Set the bar thickness here
                maxBarThickness: 20 // Maximum bar thickness
            }
        ]
    };
    
    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Degree'
                },
                grid: {
                    display: false // Hide vertical grid lines
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Count'
                },
                beginAtZero: true
            }
        }
    };
    return (
        <>
            {console.log(tokenv, "=tokenv")}
            {tokenv && !hasPkey  ? (
                <div className="content-wrapper">
                    <div className="container-full">
                        {/* <!-- Main content --> */}
                        <section className="content">
                            <div className="row">
                                <div className="col-xl-8">
                                    <div className="box no-shadow mb-0 bg-transparent">
                                        <div className="box-header no-border px-0">
                                            <h4 className="box-title">Statistics</h4>
                                            <div className="box-controls pull-right d-md-flex d-none">
                                                <Link href="#">View All</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {/* Render degree items dynamically */}
                                        {renderDegreeItems()}

                                        {/* <div className="col-lg-6 col-12">
                                            <div className="box" onClick={() => { router.push("/students") }} style={{ cursor: "pointer" }}>
                                                <div className="box-header">
                                                    <h4 className="box-title">Total Students</h4>
                                                </div>
                                                <div className="box-body">
                                                    <h1>{studentData ? studentData.total_students : 'Loading...'}</h1>
                                                </div>
                                            </div>
                                        </div> */}
                                        <div className="box-container">
                                            <Bar data={data} options={options} />
                                        </div>
                                    </div>
                                    

                                </div>
                                {
hasPermission && (
    <div className="col-xl-4 col-12">
    <div className="box no-shadow mb-0 bg-transparent">
        <div className="box-header no-border px-0">
            <h4 className="box-title">Students</h4>
            <div className="box-controls pull-right d-md-flex d-none">
                <Link href="/students">View All</Link>
            </div>
        </div>
    </div>
    <div>
        <div className="box bs-5 border-danger rounded pull-up">
            <div className="box-body">
                <div className="flex-grow-1">
                    <div className="d-flex align-items-center pe-2 justify-content-between">
                        <h4 >
                            Total Students
                        </h4>
                    </div>
                    <h1>{studentData ? studentData.total_students : 'Loading...'}</h1>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-10">
                    <div className="d-flex">
                        <Link href="#" className="me-15 bg-lightest h-50 w-50 l-h-50 rounded-circle text-center overflow-hidden">
                            <img src="/assets/images/avatar/avatar-1.png" className="h-50 align-self-end" alt="" />
                        </Link>
                        <Link href="#" className="me-15 bg-lightest h-50 w-50 l-h-50 rounded-circle text-center overflow-hidden">
                            <img src="/assets/images/avatar/avatar-3.png" className="h-50 align-self-end" alt="" />
                        </Link>
                        <Link href="#" className="me-15 bg-lightest h-50 w-50 l-h-50 rounded-circle text-center overflow-hidden">
                            <img src="/assets/images/avatar/avatar-4.png" className="h-50 align-self-end" alt="" />
                        </Link>
                    </div>
                    {/* <button type="button" className="waves-effect waves-circle btn btn-circle btn-dark"><i className="mdi mdi-plus"></i></button> */}
                    <button type="button" className="waves-effect waves-circle btn btn-circle btn-dark" onClick={() => { router.push("/students") }}>
                        <i className="mdi mdi-arrow-right"></i>
                    </button>

                </div>
            </div>
        </div>
        {/* <div className="box bs-5 border-primary rounded mb-10 pull-up">
<div className="box-body">	
<div className="flex-grow-1">	
  <div className="d-flex align-items-center pe-2 justify-content-between">							
      <h4 className="fw-500">
          Speaking club
      </h4>
      <div className="dropdown">
          <Link data-bs-toggle="dropdown" href="#" className="px-10 pt-5"><i className="ti-more-alt"></i></Link>
          <div className="dropdown-menu dropdown-menu-end">
            <Link className="dropdown-item" href="#"><i className="ti-import"></i> Import</Link>
            <Link className="dropdown-item" href="#"><i className="ti-export"></i> Export</Link>
            <Link className="dropdown-item" href="#"><i className="ti-printer"></i> Print</Link>
            <div className="dropdown-divider"></div>
            <Link className="dropdown-item" href="#"><i className="ti-settings"></i> Settings</Link>
          </div>
      </div>						
  </div>
  <p className="fs-16">
      Thu 16 PM - 17 PM
  </p>
</div>							
<div className="d-flex align-items-center justify-content-between mt-10">
  <div className="d-flex">
      <Link href="#" className="me-15 bg-lightest h-50 w-50 l-h-50 rounded-circle text-center overflow-hidden">
          <img src="/assets/images/avatar/avatar-2.png" className="h-50 align-self-end" alt=""/>
      </Link>
      <Link href="#" className="me-15 bg-lightest h-50 w-50 l-h-50 rounded-circle text-center overflow-hidden">
          <img src="/assets/images/avatar/avatar-5.png" className="h-50 align-self-end" alt=""/>
      </Link>
      <Link href="#" className="me-15 bg-lightest h-50 w-50 l-h-50 rounded-circle text-center overflow-hidden">
          <img src="/assets/images/avatar/avatar-6.png" className="h-50 align-self-end" alt=""/>
      </Link>
  </div>
  <button type="button" className="waves-effect waves-circle btn btn-circle btn-dark"><i className="mdi mdi-plus"></i></button>
</div>
</div>					
</div> */}
    </div>
   
</div>
)
                                }
                               
                            </div>
                        </section>
                        {/* <!-- /.content --> */}
                    </div>
                </div>
            ) : (<StudentDashboard/>)}
        </>
    )
}

export default Dashboard