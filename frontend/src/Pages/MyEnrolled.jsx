import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const MyEnrolled = () => {
    const [myEnroll, setMyEnroll] = useState([]);
    const {user} = useContext(AuthContext);
    useEffect(() =>{
        fetch(`http://localhost:5000/api/enrollments?email=${user?.email}`)
        .then(res => res.json())
        .then(data =>setMyEnroll(data))
    }, [user?.email])
    const handleDeleteCourse = (id) =>{
        console.log(id);
        fetch(`http://localhost:5000/api/enrollments/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(() => {
                setMyEnroll(myEnroll.filter(enrollment => enrollment.enrollment_id !== id));
            })
            .catch(e => console.log(e.message));

    }

    return (
        <div>
            <div className="overflow-x-auto border my-20 w-10/12 mx-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Enrollment Id</th>
                            <th>Course Id</th>
                            <th>Course Name</th>
                            <th>Course Description</th>
                            <th>Enrolled Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myEnroll.map(e => (
                            <tr key={e.enrollment_id}>
                                <th>{e.enrollment_id}</th>
                                <th>{e.course_id}</th>
                                <td>{e.course_name}</td>
                                <td>{e.course_description.slice(0, 30)} ...more</td>
                                <td>{e.enrolled_at.slice(0, 10)}</td>
                                <td>
                                    <button 
                                        onClick={() => handleDeleteCourse(e.enrollment_id)} 
                                        className="bg-blue-200 text-blue-500 p-2 rounded-md">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyEnrolled;