import { useEffect, useState } from "react";
import { PlusCircle, Trash2, Star, User, ClipboardList, LogOut } from "lucide-react";
import api from '../api'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router";


function Home() {
    const [apps, setApps] = useState([]);
    const [app_title, set_app_title] = useState("");
    const [app_link, set_app_link] = useState("");
    const [app_category, set_app_category] = useState("");
    const [app_sub_catagory, set_app_sub_catagory] = useState("");
    const [app_points, set_app_points] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);

    const userName = sessionStorage.getItem('username')


    useEffect(() => {
        getApp();
    }, [])

    const getApp = () => {
        api.get('/api/apps/')
            .then((res) => res.data)
            .then((data) => { setApps(data); console.log(data) })
            .catch((err) => alert(err));
    }

    const deleteApp = (id) => {
        api.delete(`/api/apps/${id}/`)
            .then((res) => {
                if (res.status === 204) {
                    alert("App Delete")
                    getApp();
                } else alert("failed To Delete App")
            }).catch((error) => alert(error))
        getApp();
    }

    const createApp = (e) => {
        e.preventDefault()
        api.post('/api/apps/', { app_title, app_link, app_category, app_sub_catagory, app_points })
            .then((res) => {
                if (res.status === 201) alert("App Created")
                else alert('Failed to make app')
            }).catch((err) => alert(err));
        getApp();
    }

    const navigate = useNavigate()

    const Handlelogout = () => {
        localStorage.removeItem('refresh');
        localStorage.removeItem('access');
        navigate('/login')
    }




    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-4 px-6">
                    <h1 className="text-2xl font-semibold text-gray-700">Hello {userName}</h1>
                </div>
            </header>

            {/* Sidebar */}
            <div className="flex">
                <div className="w-64 min-h-screen bg-white shadow">
                    <nav className="mt-4">
                        <a href="#" className="flex items-center px-6 py-2 text-gray-600 hover:bg-gray-100">
                            <button
                                onClick={() => setShowAddForm(false)}
                                className="flex items-center text-indigo-600 hover:bg-indigo-50 w-full text-left"
                            >
                                <PlusCircle className="w-4 h-4 mr-2" />
                                <span>Home</span>
                            </button>
                        </a>
                        <button
                            onClick={() => setShowAddForm(false)}
                            className="flex items-center px-6 py-2 text-indigo-600 hover:bg-indigo-50 w-full text-left"
                        >
                            <User className="w-4 h-4 mr-2" />
                            <span>Profile</span>
                        </button>
                        <button
                            onClick={() => setShowAddForm(false)}
                            className="flex items-center px-6 py-2 text-indigo-600 hover:bg-indigo-50 w-full text-left"
                        >
                            <Star className="w-4 h-4 mr-2" />
                            <span>Points</span>
                        </button>
                        <button
                            onClick={() => setShowAddForm(false)}
                            className="flex items-center px-6 py-2 text-indigo-600 hover:bg-indigo-50 w-full text-left"
                        >
                            <ClipboardList className="w-4 h-4 mr-2" />
                            <span>Task</span>
                        </button>
                        <button
                            onClick={() => Handlelogout()}
                            className="flex items-center px-6 py-2 text-indigo-600 hover:bg-indigo-50 w-full text-left"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            <span>Logout</span>
                        </button>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 px-8 py-6">
                    {showAddForm ? (
                        <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
                            <form onSubmit={createApp} className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    {/* App Title Input */}
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="App Title"
                                            value={app_title}
                                            onChange={(e) => set_app_title(e.target.value)}
                                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>

                                    {/* App Link Input */}
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="App Link"
                                            value={app_link}
                                            onChange={(e) => set_app_link(e.target.value)}
                                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>

                                    {/* App Category Select */}
                                    <div>
                                        <select
                                            value={app_category}
                                            onChange={(e) => set_app_category(e.target.value)}
                                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <option value="">App Category</option>
                                            <option value="entertainment">Entertainment</option>
                                            <option value="productivity">Productivity</option>
                                            <option value="social">Social</option>
                                            <option value="utility">Utility</option>
                                        </select>
                                    </div>

                                    {/* Sub Category Select */}
                                    <div>
                                        <select
                                            value={app_sub_catagory}
                                            onChange={(e) => set_app_sub_catagory(e.target.value)}
                                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <option value="">Sub Category</option>
                                            <option value="games">Games</option>
                                            <option value="music">Music</option>
                                            <option value="video">Video</option>
                                            <option value="tools">Tools</option>
                                        </select>
                                    </div>

                                    {/* Points Input */}
                                    <div className="col-span-2">
                                        <input
                                            type="number"
                                            placeholder="Points"
                                            value={app_points}
                                            onChange={(e) => set_app_points(e.target.value)}
                                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    >
                                        ADD POINTS
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        // Apps List
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {apps.map((app) => (
                                <div key={app.id} className="bg-white rounded-lg shadow p-6">
                                    <div className="flex justify-between items-start">
                                        <div className="w-full">
                                            {app.app_logo ? (
                                                <img
                                                    src={app.app_logo}
                                                    alt={app.app_title}
                                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                                    onError={(e) => {
                                                        e.target.src = '/placeholder-image.png';
                                                        e.target.onerror = null;
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                                                    <span className="text-gray-400">No image</span>
                                                </div>
                                            )}
                                            <h3 className="text-lg font-semibold">{app.app_title}</h3>
                                            <p className="text-sm text-gray-600">{app.app_category} - {app.app_sub_catagory}</p>
                                            <p className="text-sm text-gray-600 mt-2">Points: {app.app_points}</p>
                                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                                <div
                                                    className="bg-blue-600 h-2.5 rounded-full"
                                                    style={{ width: `${app.app_points}%` }}
                                                ></div>
                                            </div>
                                            <Link
                                                to={`/app/${app.id}`}
                                                className="text-indigo-600 text-sm hover:underline mt-2 block"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                        <button
                                            onClick={() => deleteApp(app.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;