import React from 'react';

const albumImages = [
    '/images/IMG_4535.PNG',
    '/images/IMG_5406.PNG',
    '/images/IMG_5412.PNG',
    '/images/IMG_5593.PNG',
    '/images/IMG_5594.PNG',
];

const ThankYou: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-red-100 flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 max-w-2xl mx-auto border border-pink-200 transform hover:scale-105 transition duration-300">
            <h1 className="text-5xl font-extrabold text-green-400 mb-6 text-center font-[Roboto,Segoe UI,Arial,sans-serif] drop-shadow-lg bg-gradient-to-r from-green-300 to-green-500 text-transparent bg-clip-text">
                Lời cảm ơn gửi đến em 💌
            </h1>
            <img
                src="/images/thank-you.png"
                alt="Hoa cảm ơn"
                style={{ width: '80px', height: '80px' }}
                className="mx-auto mb-8 rounded-full shadow-xl object-cover border-4 border-green-300 animate-pulse"
            />
            <p className="text-xl text-green-700 leading-relaxed mb-8 text-center font-[Roboto,Segoe UI,Arial,sans-serif] drop-shadow-md bg-gray-50 p-4 rounded-lg">
                Gửi em yêu,<br /><br />
                Một năm bên nhau là một hành trình tuyệt vời. Anh cảm ơn em vì đã luôn bên cạnh, động viên và yêu thương anh.
                Em đã làm cho cuộc sống của anh trở nên ý nghĩa và hạnh phúc hơn mỗi ngày.<br /><br />
                Anh mong rằng chúng ta sẽ cùng nhau tạo thêm thật nhiều kỷ niệm đẹp, cùng nhau vượt qua mọi thử thách và luôn giữ vững tình yêu này.<br /><br />
                Yêu em rất nhiều! 💖
            </p>
            <button
                onClick={onBack}
                className="mt-6 px-8 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-full shadow-lg hover:from-green-600 hover:to-teal-600 transition duration-300 transform hover:-translate-y-1"
            >
                ← Quay lại Timeline
            </button>
        </div>
        <div className="mt-12 max-w-5xl w-full">
            <h2 className="text-3xl font-bold text-green-400 mb-6 text-center font-[Roboto,Segoe UI,Arial,sans-serif] drop-shadow-lg bg-gradient-to-r from-green-300 to-green-500 text-transparent bg-clip-text">
                Album Kỷ Niệm
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {albumImages.map((src, idx) => (
                    <div key={idx} className="relative group">
                        <img
                            src={src}
                            alt={`Kỷ niệm ${idx + 1}`}
                            className="w-full h-24 sm:h-28 md:h-32 object-cover rounded-lg shadow-md border border-green-200 hover:border-green-400 transition duration-300 transform hover:scale-105 group-hover:shadow-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-300 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition duration-300">
                                {idx + 1}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default ThankYou;