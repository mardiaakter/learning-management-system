import { useEffect, useState } from "react";

const AssignmentQuestions = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = () => {
        fetch('http://localhost:5000/api/assignments/questions')
            .then(res => res.json())
            .then(data => {
                setQuestions(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleDownload = (filePath) => {
        window.open(`http://localhost:5000/api/assignments/questions/${filePath}`, '_blank');
    };

    return (
        <div>
            <div className="overflow-x-auto border my-20 w-10/12 mx-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Question Id</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Instructor Email</th>
                            <th>Upload Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map(q => (
                            <tr key={q.question_id}>
                                <th>{q.question_id}</th>
                                <th>{q.title}</th>
                                <td>{q.description}</td>
                                <td>{q.instructor_email}</td>
                                <td>{q.uploaded_at.slice(0, 10)}</td>
                                <td>
                                    <button 
                                        onClick={() => handleDownload(q.file_path)} 
                                        className="bg-blue-200 text-blue-500 p-2 rounded-md">
                                        Download
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

export default AssignmentQuestions;
