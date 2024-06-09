import { useContext, useState } from 'react';
import { AuthContext } from './../Provider/AuthProvider';

const Register = () => {
    const { createUser, updateInfo } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        console.log(formData);
        createUser(formData.email, formData.password)
            .then(result => {
                const loggedUser = result.user;
                updateInfo(formData.name);
                console.log(loggedUser);
                const user = {
                    username: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role
                }
                fetch('http://localhost:5000/api/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
            })
            .catch(error => {
                console.log(error.message);
            })
    };

    return (
        <div>
            <div className="card max-w-sm  mx-auto shadow-2xl bg-base-100 my-20">
                <form className="card-body" onSubmit={handleRegister}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Your name"
                            name="name"
                            className="input input-bordered"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Your email"
                            name="email"
                            className="input input-bordered"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="password"
                            name="password"
                            className="input input-bordered"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Your Role</span>
                        </div>
                        <select
                            className="select select-bordered"
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                        >
                            <option disabled value="">Pick one</option>
                            <option value="Student">Student</option>
                            <option value="Instructor">Instructor</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </label>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
