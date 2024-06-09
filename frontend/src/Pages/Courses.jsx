import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from 'sweetalert2'
const Courses = () => {
    const [courses, setCourses] = useState([]);
    const { user } = useContext(AuthContext);
    useEffect(() => {
        fetch('http://localhost:5000/api/courses')
            .then(res => res.json())
            .then(data => setCourses(data))
    }, [])
    console.log(courses);
    const handleEnroll = (courseId) => {
        fetch('http://localhost:5000/api/enrollments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: user.email, course_id: courseId })
        })
            .then(res => res.json())
            .then(() => {
                Swal.fire({
                    title: "Good job!",
                    text: "Successfully enrolled course",
                    icon: "success"
                });
            })
            .catch(e => console.log(e.message));
    };
    return (
        <div className="w-10/12 mx-auto my-10">
            <h1 className="text-2xl font-semibold text-blue-800 text-center bg-blue-300 py-3 mb-4 w-max mx-auto px-10 rounded-xl">See All courses</h1>
            <div className="grid md:grid-cols-3 gap-10">
                {
                    courses?.length > 0 &&
                    courses.map(course =>
                        <div key={course.course_id} className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">{course.course_name}</h2>
                                <p>{course.course_description}</p>
                                <div className="card-actions">
                                    <p>Email: {course.email}</p>
                                    <p>Posted: {course.created_at.slice(0, 10)}</p>
                                    <button onClick={() => handleEnroll(course.course_id)} className="btn btn-primary btn-sm">Enroll Now</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

        </div>
    );
};

export default Courses;