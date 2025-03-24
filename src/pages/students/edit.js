import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const StudentEditForm = () => {
  const [student, setStudent] = useState({
    id: '',
    student_id: '',
    name: '',
    gender: '',
    dob: '',
    batchstart: '',
    batchend: '',
    degree: '',
    program: '',
    address: '',
    city: '',
    district: '',
    state: '',
    pincode: '',
    mobile: '',
    alternate_mobile: '',
    email: '',
    company: '',
    work_experience: '',
    from_year: '',
    roll_number: '',
    to_year: '',
    roles_were: '',
    industries: '',
    institution: '',
    photo: '', // Store filename here
  });

  const [photoFile, setPhotoFile] = useState(null); // For handling file input
  const router = useRouter();

  useEffect(() => {
    const fetchStudentData = async () => {
      const studentId = localStorage.getItem("studentId");
      try {
        const response = await axios.get(`https://kyroes.in/st-josephs/api/student/byid/${studentId}`);
        setStudent(response.data.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleFileChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const handleRemovePhoto = () => {
    setStudent({ ...student, photo: '' });
    setPhotoFile(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(student).forEach(key => {
      formData.append(key, student[key]);
    });

    if (photoFile) {
      formData.append('photo', photoFile);
    }

    try {
      await axios.post('https://kyroes.in/st-josephs/api/updateStudent/', formData);
      alert('Student updated successfully');
    } catch (error) {
      console.error('Error updating student data:', error);
      alert('Error updating student data');
    }
  };

  const handleCancel = () => {
    router.back(); // Navigate back to the previous page
  };

  return (
    <div className="content-wrapper">
      <div className="container-full">
        <div className="content-header">
          <div className="d-flex align-items-center">
            <div className="me-auto">
              <h3 className="page-title">Edit Student</h3>
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#"><i className="mdi mdi-home-outline"></i></a></li>
                  <li className="breadcrumb-item" aria-current="page">Students</li>
                  <li className="breadcrumb-item active" aria-current="page">Edit</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="row">
            <div className="col-12">
              <div className="box">
                <div className="box-header with-border">
                  <h4 className="box-title">About Student</h4>
                </div>
                <div className="box-body">
                  <form onSubmit={handleFormSubmit}>
                    <div className="form-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Student ID</label>
                            <input
                              type="text"
                              className="form-control"
                              name="student_id"
                              value={student.student_id}
                              onChange={handleInputChange}
                              placeholder="Student ID"
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              value={student.name}
                              onChange={handleInputChange}
                              placeholder="Name"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Gender</label>
                            <select
                              className="form-control"
                              name="gender"
                              value={student.gender}
                              onChange={handleInputChange}
                            >
                              <option value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Date of Birth</label>
                            <input
                              type="date"
                              className="form-control"
                              name="dob"
                              value={student.dob}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Batch Start</label>
                            <input
                              type="text"
                              className="form-control"
                              name="batchstart"
                              value={student.batchstart}
                              onChange={handleInputChange}
                              placeholder="Batch Start"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Batch End</label>
                            <input
                              type="text"
                              className="form-control"
                              name="batchend"
                              value={student.batchend}
                              onChange={handleInputChange}
                              placeholder="Batch End"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Degree</label>
                            <input
                              type="text"
                              className="form-control"
                              name="degree"
                              value={student.degree}
                              onChange={handleInputChange}
                              placeholder="Degree"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Program</label>
                            <input
                              type="text"
                              className="form-control"
                              name="program"
                              value={student.program}
                              onChange={handleInputChange}
                              placeholder="Program"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Address</label>
                            <input
                              type="text"
                              className="form-control"
                              name="address"
                              value={student.address}
                              onChange={handleInputChange}
                              placeholder="Address"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">City</label>
                            <input
                              type="text"
                              className="form-control"
                              name="city"
                              value={student.city}
                              onChange={handleInputChange}
                              placeholder="City"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">District</label>
                            <input
                              type="text"
                              className="form-control"
                              name="district"
                              value={student.district}
                              onChange={handleInputChange}
                              placeholder="District"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">State</label>
                            <input
                              type="text"
                              className="form-control"
                              name="state"
                              value={student.state}
                              onChange={handleInputChange}
                              placeholder="State"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Pincode</label>
                            <input
                              type="text"
                              className="form-control"
                              name="pincode"
                              value={student.pincode}
                              onChange={handleInputChange}
                              placeholder="Pincode"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Mobile</label>
                            <input
                              type="text"
                              className="form-control"
                              name="mobile"
                              value={student.mobile}
                              onChange={handleInputChange}
                              placeholder="Mobile"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Alternate Mobile</label>
                            <input
                              type="text"
                              className="form-control"
                              name="alternate_mobile"
                              value={student.alternate_mobile}
                              onChange={handleInputChange}
                              placeholder="Alternate Mobile"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              value={student.email}
                              onChange={handleInputChange}
                              placeholder="Email"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Company</label>
                            <input
                              type="text"
                              className="form-control"
                              name="company"
                              value={student.company}
                              onChange={handleInputChange}
                              placeholder="Company"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Work Experience</label>
                            <input
                              type="text"
                              className="form-control"
                              name="work_experience"
                              value={student.work_experience}
                              onChange={handleInputChange}
                              placeholder="Work Experience"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">From Year</label>
                            <input
                              type="text"
                              className="form-control"
                              name="from_year"
                              value={student.from_year}
                              onChange={handleInputChange}
                              placeholder="From Year"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Roll Number</label>
                            <input
                              type="text"
                              className="form-control"
                              name="roll_number"
                              value={student.roll_number}
                              onChange={handleInputChange}
                              placeholder="Roll Number"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">To Year</label>
                            <input
                              type="text"
                              className="form-control"
                              name="to_year"
                              value={student.to_year}
                              onChange={handleInputChange}
                              placeholder="To Year"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Roles</label>
                            <input
                              type="text"
                              className="form-control"
                              name="roles_were"
                              value={student.roles_were}
                              onChange={handleInputChange}
                              placeholder="Roles"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Industries</label>
                            <input
                              type="text"
                              className="form-control"
                              name="industries"
                              value={student.industries}
                              onChange={handleInputChange}
                              placeholder="Industries"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Institution</label>
                            <input
                              type="text"
                              className="form-control"
                              name="institution"
                              value={student.institution}
                              onChange={handleInputChange}
                              placeholder="Institution"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="fw-700 fs-16 form-label">Photo</label>
                            <input
                              type="file"
                              className="form-control"
                              name="photo"
                              onChange={handleFileChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-actions mt-10">
                      <button type="submit" className="btn btn-primary"> <i className="fa fa-check"></i> Save</button>
                      <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>          
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentEditForm;
