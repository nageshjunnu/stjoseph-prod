import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Header = () => {
	const [hasPKey, setHasPKey] = useState(false);
	useEffect(() => {
		const usersData = JSON.parse(localStorage.getItem("usersData"))
		if (usersData?.data?.pkey) {
			setHasPKey(true)
		}
		else {
			setHasPKey(false)
		}
	}, [])
	const [isSidebarActive, setSidebarActive] = useState(false);

    const toggleSidebar = () => {
        setSidebarActive(!isSidebarActive);
    };
	const [studentId, setStudentId] = useState(null);
    const [hasPkey, setHasPkey] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const usersData = JSON.parse(localStorage.getItem("usersData"));
            if (usersData) {
                if (usersData.data.pkey) {
                    setHasPkey(true);
                    setStudentId(usersData.data.student_id);
                }
                if (usersData.data.permission) {
                    setUserId(usersData.data.id);
                    setHasPermission(usersData.data.permission);
                }
            }
        }
    }, []);
	return (
		<header className="main-header">
			<div className="d-flex align-items-center logo-box justify-content-start">
				<Link href="#" className="waves-effect waves-light nav-link d-none d-md-inline-block mx-10 push-btn bg-transparent" data-toggle="push-menu" role="button">
					<span className="icon-Align-left"><span className="path1"></span><span className="path2"></span><span className="path3"></span></span>
				</Link>
				<Link href="index.html" className="logo">
					<div className="logo-lg">
						<span className="light-logo"><img src="https://kyroes.co/assets/img/logo/logo-3.png" alt="logo" /></span>
						<span className="dark-logo"><img src="https://kyroes.co/assets/img/logo/logo-3.png" alt="logo" /></span>
					</div>
				</Link>
			</div>
			<nav className="navbar navbar-static-top">
				<div className="app-menu">
					<ul className="header-megamenu nav">
						<li className="btn-group nav-item d-md-none">
						<Link href="#" className="waves-effect waves-light nav-link push-btn" onClick={toggleSidebar} role="button">
							<span className="icon-Align-left">
							<span className="path1"></span>
							<span className="path2"></span>
							<span className="path3"></span>
							</span>
						</Link>

						</li>
						{/* <li className="btn-group nav-item d-none d-xl-inline-block">
							<Link href="contact_app_chat.html" className="waves-effect waves-light nav-link svg-bt-icon" title="Chat">
								<i className="icon-Chat"><span className="path1"></span><span className="path2"></span></i>
							</Link>
						</li>
						<li className="btn-group nav-item d-none d-xl-inline-block">
							<Link href="mailbox.html" className="waves-effect waves-light nav-link svg-bt-icon" title="Mailbox">
								<i className="icon-Mailbox"><span className="path1"></span><span className="path2"></span></i>
							</Link>
						</li>
						<li className="btn-group nav-item d-none d-xl-inline-block">
							<Link href="extra_taskboard.html" className="waves-effect waves-light nav-link svg-bt-icon" title="Taskboard">
								<i className="icon-Clipboard-check"><span className="path1"></span><span className="path2"></span><span className="path3"></span></i>
							</Link>
						</li> */}
					</ul>
				</div>

				<div className="navbar-custom-menu r-side">
					<ul className="nav navbar-nav">
						{/* <li className="btn-group nav-item d-lg-inline-flex d-none">
							<Link href="#" data-provide="fullscreen" className="waves-effect waves-light nav-link full-screen" title="Full Screen">
								<i className="icon-Expand-arrows"><span className="path1"></span><span className="path2"></span></i>
							</Link>
						</li> */}
						{/* <li className="btn-group d-lg-inline-flex d-none">
							<div className="app-menu">
								<div className="search-bx mx-5">
									<form>
										<div className="input-group">
											<input type="search" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />
											<div className="input-group-append">
												<button className="btn" type="submit" id="button-addon3"><i className="ti-search"></i></button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</li> */}
						<li className="dropdown notifications-menu">
							{/* <Link href="#" className="waves-effect waves-light dropdown-toggle" data-bs-toggle="dropdown" title="Notifications">
								<i className="icon-Notifications"><span className="path1"></span><span className="path2"></span></i>
							</Link> */}
							<ul className="dropdown-menu animated bounceIn">

								{/* <li className="header">
				<div className="p-20">
					<div className="flexbox">
						<div>
							<h4 className="mb-0 mt-0">Notifications</h4>
						</div>
						<div>
							<Link href="#" className="text-danger">Clear All</Link>
						</div>
					</div>
				</div>
			  </li> */}

								{/* <li>
				<ul className="menu sm-scrol">
				  <li>
					<Link href="#">
					  <i className="fa fa-users text-info"></i> 
                        <p>Curabitur id eros quis nunc suscipit blandit.</p>
					</Link>
				  </li>
				  
				</ul>
			  </li> */}
								<li className="footer">
									<Link href="#">View all</Link>
								</li>
							</ul>
						</li>
<li className="dropdown user user-menu">
							<Link href={`/users/${userId}`} className="waves-effect waves-light dropdown-toggle" data-bs-toggle="dropdown" title="User">
								<i className="ti-user text-muted me-2"/>
							</Link>

						</li>
            <li className="dropdown user user-menu">
							<Link href="/loginProfile" className="waves-effect waves-light dropdown-toggle" data-bs-toggle="dropdown" title="User">
								<i className="ti-settings text-muted me-2"/>
							</Link>

						</li>
						<li className="dropdown user user-menu">
							<Link href="/" onClick={() => { localStorage.clear() }} className="waves-effect waves-light dropdown-toggle" data-bs-toggle="dropdown" title="User">
								<i className="ti-lock text-muted me-2"></i> 
							</Link>

						</li>

						<li>
							{/* <Link href="#" data-toggle="control-sidebar" title="Setting" className="waves-effect waves-light">
								<i className="icon-Settings"><span className="path1"></span><span className="path2"></span></i>
							</Link> */}
						</li>

					</ul>
				</div>
			</nav>
			{
        isSidebarActive && (
          <aside className={`main-sidebar ${isSidebarActive ? 'active' : ''}`}>
          <section className="sidebar position-relative">
            <div className="multinav">
              <div>
                <ul className="sidebar-menu" data-widget="tree">
                  <li className="header">Dashboard & Apps</li>
                  <li>
                    <Link href="/dashboard">
                      <i className="icon-Layout-4-blocks">
                        <span className="path1"></span>
                        <span className="path2"></span>
                      </i>
                      <span>Dashboard</span>
                    </Link>
                  </li>
                  {hasPermission && (
                    <li className="treeview">
                      <Link href="#">
                        <i className="icon-Layout-4-blocks">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        <span>Students</span>
                        <span className="pull-right-container">
                          <i className="fa fa-angle-right pull-right"></i>
                        </span>
                      </Link>
                      <ul className="treeview-menu">
                        <li>
                          <Link href="/students">
                            <i className="icon-Layout-4-blocks"></i> All Students
                          </Link>
                        </li>
                        {hasPermission !== 'view' && (
                          <li>
                            <Link href="/students/new-student">
                              <i className="icon-Layout-4-blocks"></i> New Student
                            </Link>
                          </li>
                        )}
                      </ul>
                    </li>
                  )}
                  {hasPermission && (
                    <li className="treeview">
                      <Link href="#">
                        <i className="icon-Layout-4-blocks">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        <span>Users</span>
                        <span className="pull-right-container">
                          <i className="fa fa-angle-right pull-right"></i>
                        </span>
                      </Link>
                      <ul className="treeview-menu">
                        <li>
                          <Link href={`/users/${userId}`}>
                            <i className="icon-Layout-4-blocks"></i> View User
                          </Link>
                        </li>
                        <li>
                          <Link href="/users/new-user">
                            <i className="icon-Layout-4-blocks"></i> Create User
                          </Link>
                        </li>
                        {hasPermission === 'full access' && (
                          <li>
                            <Link href="/users">
                              <i className="icon-Layout-4-blocks"></i> All Users
                            </Link>
                          </li>
                        )}
                      </ul>
                    </li>
                  )}
                  {hasPermission && hasPermission !== 'view' && (
                    <li className="treeview">
                      <Link href="/contacts">
                        <i className="icon-Layout-4-blocks">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        <span>Contacts</span>
                      </Link>
                    </li>
                  )}
                  <li>
                    {hasPkey && (
                      <Link href={`/students/view-profile`}>
                        <i className="icon-Layout-4-blocks">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                        View Profile
                      </Link>
                    )}
                  </li>
                  <li className="1">
                    <Link href="/knowYourAlumni">
                      <i className="icon-Layout-4-blocks">
                        <span className="path1"></span>
                        <span className="path2"></span>
                      </i>
                      <span>Know Your Alumni</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          <div className="sidebar-footer">
            <Link href="#" className="link" title="Settings">
              <span className="icon-Settings-2"></span>
            </Link>
            <Link href="mailbox.html" className="link" title="Email">
              <span className="icon-Mail"></span>
            </Link>
            <Link href="/" className="link" title="Logout" onClick={() => { localStorage.clear(); }}>
              <span className="icon-Lock-overturning">
                <span className="path1"></span>
                <span className="path2"></span>
              </span>
            </Link>
          </div>
        </aside>
        )
      }
  
		</header>
	)
}

export default Header