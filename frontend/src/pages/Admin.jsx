import { useEffect, useState } from "react";
import { PlusCircle, Trash2, LogOut, HomeIcon } from "lucide-react";
import api from '../api';
import { useNavigate } from 'react-router-dom';

function Admin() {
    const [apps, setApps] = useState([]);
    const [app_title, set_app_title] = useState("");
    const [app_link, set_app_link] = useState("");
    const [app_category, set_app_category] = useState("");
    const [app_sub_catagory, set_app_sub_catagory] = useState("");
    const [app_points, set_app_points] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const [app_logo, set_app_logo] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);

    const navigate = useNavigate();

    const Handlelogout = () => {
        localStorage.removeItem('refresh');
        localStorage.removeItem('access');
        navigate('/login');
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            set_app_logo(file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        getApp();
    }, []);

    const getApp = () => {
        api.get('/api/apps/')
            .then((res) => res.data)
            .then((data) => { setApps(data); console.log(data) })
            .catch((err) => alert(err));
    };

    const deleteApp = (id) => {
        api.delete(`/api/apps/${id}`)
            .then((res) => {
                if (res.status === 204) {
                    alert("App Deleted");
                    getApp();
                } else {
                    alert("Failed To Delete App");
                }
            }).catch((error) => alert(error));
    };

    const createApp = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('app_title', app_title);
        formData.append('app_link', app_link);
        formData.append('app_category', app_category);
        formData.append('app_sub_catagory', app_sub_catagory);
        formData.append('app_points', app_points);
        if (app_logo) {
            formData.append('app_logo', app_logo);
        }

        try {
            const res = await api.post('/api/apps/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.status === 201) {
                alert("App Created");
                // Reset form
                set_app_title("");
                set_app_link("");
                set_app_category("");
                set_app_sub_catagory("");
                set_app_points("");
                set_app_logo(null);
                setLogoPreview(null);
                getApp();
                setShowAddForm(false);
            } else {
                alert('Failed to create app');
            }
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-4 px-6">
                    <h1 className="text-2xl font-semibold text-gray-700">Hello Admin</h1>
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
                                <HomeIcon className="w-4 h-4 mr-2" />
                                <span>Home</span>
                            </button>
                        </a>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="flex items-center px-6 py-2 text-indigo-600 hover:bg-indigo-50 w-full text-left"
                        >
                            <PlusCircle className="w-4 h-4 mr-2" />
                            <span>Add Apps</span>
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

                                    {/* App image Input */}
                                    <div className="col-span-2">
                                        <div className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
                                            {logoPreview && (
                                                <img
                                                    src={logoPreview}
                                                    alt="Logo preview"
                                                    className="w-32 h-32 object-contain mb-4"
                                                />
                                            )}
                                            <label className="cursor-pointer bg-indigo-50 px-4 py-2 rounded-md hover:bg-indigo-100">
                                                <span className="text-indigo-600">Upload Logo</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleLogoChange}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                    </div>

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
                                            type="range"
                                            value={app_points}
                                            onChange={(e) => set_app_points(e.target.value)}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                            min="0"
                                            max="100"
                                        />
                                        <span className="text-sm text-gray-600">Points: {app_points}</span>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    >
                                        ADD APP
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
                                            <a href={app.app_link} className="text-indigo-600 text-sm hover:underline mt-2 block">
                                                View App
                                            </a>
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

export default Admin;