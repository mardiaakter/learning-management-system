import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const MyCourses = () => {
    const [myCourses, setMyCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courseName, setCourseName] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/api/mycourses?email=${user.email}`)
                .then(res => res.json())
                .then(data => setMyCourses(data))
                .catch(e => console.error('Error fetching courses:', e));
        }
    }, [user?.email]);

    const handleDeleteCourse = (id) => {
        fetch(`http://localhost:5000/api/courses/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(() => {
                setMyCourses(prevCourses => prevCourses.filter(course => course.course_id !== id));
            })
            .catch(e => console.log(e.message));
    };

    const handleUpdateCourse = (id) => {
        const updatedData = { course_name: courseName, course_description: courseDescription };
        fetch(`http://localhost:5000/api/courses/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
            .then(res => res.json())
            .then(updatedCourse => {
                setMyCourses(prevCourses => prevCourses.map(course => 
                    course.course_id === id ? updatedCourse : course
                ));
                closeModal(); // Close the modal
            })
            .catch(e => console.log(e.message));
    };

    const openModal = (course) => {
        setSelectedCourse(course);
        setCourseName(course.course_name);
        setCourseDescription(course.course_description);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedCourse(null);
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="overflow-x-auto border my-20 w-10/12 mx-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Course Id</th>
                            <th>Course Name</th>
                            <th>Course Description</th>
                            <th>Create Time</th>
                            <th>Update</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myCourses.map(course => (
                            <tr key={course.course_id}>
                                <th>{course.course_id}</th>
                                <td>{course.course_name}</td>
                                <td>{course.course_description.slice(0, 30)}</td>
                                <td>{course.created_at.slice(0, 10)}</td>
                                <td>
                                    <button 
                                        onClick={() => openModal(course)} 
                                        className="bg-blue-200 text-blue-500 p-2 rounded-md">
                                        Update
                                    </button>
                                </td>
                                <td>
                                    <button 
                                        onClick={() => handleDeleteCourse(course.course_id)} 
                                        className="bg-blue-200 text-blue-500 p-2 rounded-md">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="modal-box relative bg-white p-6 rounded shadow-lg">
                        <h3 className="font-bold text-lg">Update Course</h3>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdateCourse(selectedCourse.course_id);
                        }}>
                            <div className="form-control">
                                <label className="label">Course Name</label>
                                <input
                                    type="text"
                                    value={courseName}
                                    onChange={(e) => setCourseName(e.target.value)}
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">Course Description</label>
                                <textarea
                                    value={courseDescription}
                                    onChange={(e) => setCourseDescription(e.target.value)}
                                    className="textarea textarea-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Update</button>
                            </div>
                        </form>
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyCourses;
