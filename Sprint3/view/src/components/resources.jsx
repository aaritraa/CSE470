import React from 'react';

function Resources() {
    const videos = [
        { id: 1, name: 'Video 1', title: 'Description', youtubeLink: 'https://www.youtube.com/embed/Tn3lZE0rRBs' },
        { id: 2, name: 'Veterinary Secrets', title: 'Description', youtubeLink: 'https://www.youtube.com/embed/OM1i-_Kctyk' },
        { id: 3, name: 'Purina Australia', title: 'Description', youtubeLink: 'https://www.youtube.com/embed/0zyNzDtBCfI' }
    ];

    return (
        <div className="bg-white font-family-karla">

            {/* Top Bar Nav */}
            <nav className="w-full py-4 bg-blue-800 shadow">
                <div className="w-full container mx-auto flex flex-wrap items-center justify-between">

                    <nav>
                        <ul className="flex items-center justify-between font-bold text-sm text-white uppercase no-underline">
                            <li><a className="hover:text-gray-200 hover:underline px-4" href="/profile">Profile</a></li>
                            <li><a className="hover:text-gray-200 hover:underline px-4" href="/home">Home</a></li>
                        </ul>
                    </nav>

                    <div className="flex items-center text-lg no-underline text-white pr-6">
                        <a className="" href="#">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a className="pl-6" href="#">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a className="pl-6" href="#">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a className="pl-6" href="#">
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </div>
                </div>
            </nav>

            {/* Text Header */}
            <header className="w-full container mx-auto">
                <div className="flex flex-col items-center py-12">
                    <a className="font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl" href="#">
                        PET CONNECT
                    </a>
                    <p className="text-lg text-gray-600">
                        Welcome to the Community of Pets!
                    </p>
                </div>
            </header>

            {/* Video List */}
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-4"> Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {videos.map(video => (
                        <div key={video.id} className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-2">{video.name}</h3>
                            <p className="text-gray-700 mb-4">{video.title}</p>
                            {video.youtubeLink && (
                                <div className="relative" style={{ paddingBottom: '56.25%' }}>
                                    <iframe
                                        title={video.title}
                                        className="absolute top-0 left-0 w-full h-full"
                                        src={video.youtubeLink}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}
                            {!video.youtubeLink && (
                                <a href={`/video/${video.id}`} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Watch Video</a>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <footer className="w-full border-t bg-white pb-12">
                {/* Footer Content Goes Here */}
            </footer>

        </div>
    );
}

export default Resources;