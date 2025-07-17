import React from 'react';

const albumImages = [
    '/images/album1.jpg',
    '/images/album2.jpg',
    '/images/album3.jpg',
    // Thêm đường dẫn ảnh của bạn vào đây
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
        <div className="mt-12 max-w-3xl w-full">
            <h2 className="text-3xl font-bold text-green-400 mb-6 text-center font-[Roboto,Segoe UI,Arial,sans-serif] drop-shadow-lg bg-gradient-to-r from-green-300 to-green-500 text-transparent bg-clip-text">
                Album Kỷ Niệm
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {albumImages.map((src, idx) => (
                    <img
                        key={idx}
                        src={src}
                        alt={`Kỷ niệm ${idx + 1}`}
                        className="w-full h-48 object-cover rounded-2xl shadow-xl border-2 border-green-200 hover:border-green-400 transition duration-300 transform hover:scale-105"
                    />
                ))}
            </div>
        </div>
    </div>
);

export default ThankYou;