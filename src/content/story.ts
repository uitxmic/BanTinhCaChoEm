// Cập nhật passcode, timeline và nội dung lá thư tại file này.

export type TimelineMedia = {
  type: 'image' | 'video';
  src: string;
  alt: string;
  caption?: string;
  poster?: string;
};

export type TimelineMoment = {
  id: string;
  date: string;
  title: string;
  location: string;
  description: string;
  quote?: string;
  tags: string[];
  accent: string;
  media: TimelineMedia[];
};

export const relationshipStartDate = '2024-04-20T00:00:00+07:00';

export const coupleStory = {
  eyebrow: 'Anniversary microsite',
  title: 'Chuyện tình yêu của Như Anh và Minh Khôi',
  subtitle:
    'Một không gian nhỏ nhưng dịu và hiện đại hơn để lưu lại nhịp đập của trái tim, từng cột mốc và một lá thư bí mật chỉ thuộc về hai người.',
  summary:
    'Hãy đi đến cuối cùng của trang web để tìm một món quà nhỏ mà anh đã chuẩn bị cho em. Nó sẽ chỉ xuất hiện khi em nhập đúng mật mã, và bên trong đó là một lá thư mà anh đã viết riêng cho em, cùng với một vài điều nữa mà anh nghĩ sẽ làm em thích.',
};

export const timelineMoments: TimelineMoment[] = [
  {
    id: 'first-hello',
    date: '20.04.2024',
    title: 'Ngày đầu tiên quen nhau',
    location: 'Khoảnh khắc mọi thứ bắt đầu',
    description:
      'Một ngày rất bình thường nhưng lại trở thành mốc đầu tiên để sau này nhìn lại và nhận ra rằng từ đây câu chuyện của hai đứa đã bắt đầu đổi màu.',
    quote: 'Có những kết nối xuất hiện rất nhẹ, nhưng đủ để khiến cả một ngày trở nên khác hẳn.',
    tags: ['First hello', 'Dấu mốc 01', 'Mở đầu'],
    accent: '#ff8fab',
    media: [
      {
        type: 'image',
        src: '/images/IMG_4535.PNG',
        alt: 'Khoảnh khắc mở đầu câu chuyện tình yêu',
        caption: 'Anh không có ảnh hôm đó nên dùm tạm ảnh này hehe.',
      },
    ],
  },
  {
    id: 'first-date',
    date: '21.04.2024',
    title: 'Cuộc hẹn đầu tiên',
    location: 'Một buổi hẹn ở Bình Thạnh',
    description:
      'Từ những câu chuyện nhỏ, cảm giác ngại ngùng ban đầu và bầu không khí rất riêng của buổi hẹn đầu tiên, mọi thứ dần trở nên gần gũi hơn.',
    quote: 'Một buổi hẹn đầu tiên đẹp nhất là khi cả hai đều muốn kéo dài nó thêm một chút nữa.',
    tags: ['First date', 'Bình Thạnh', 'Closer'],
    accent: '#f59e9e',
    media: [
      {
        type: 'image',
        src: '/images/IMG_5406.PNG',
        alt: 'Hình ảnh gợi nhớ buổi hẹn đầu tiên',
        caption: 'Anh không có ảnh hôm đó nên dùm tạm ảnh này hehe.',
      },
      {
        type: 'image',
        src: '/images/IMG_5412.PNG',
        alt: 'Khoảnh khắc phụ của buổi hẹn đầu tiên',
      },
    ],
  },
  {
    id: 'first-fireworks',
    date: '31.05.2024',
    title: 'Lần đầu cùng nhau xem pháo hoa',
    location: 'Một buổi tối rất nhiều ánh sáng',
    description:
      'Không cần quá nhiều chi tiết để nhớ lại cảm xúc của hôm ấy. Chỉ cần nhắc đến pháo hoa là đủ để nhớ cảm giác đứng cạnh nhau và chia sẻ cùng một bầu trời.',
    quote: 'Có những ký ức sáng rực lên rất nhanh, nhưng lại ở rất lâu trong tim.',
    tags: ['Fireworks', 'Night', 'Spark'],
    accent: '#c084fc',
    media: [
      {
        type: 'video',
        src: 'videos/IMG_6037.MOV',
        alt: 'Kỷ niệm buổi tối xem pháo hoa',
      },
    ],
  },
  {
    id: 'vung-tau-trip',
    date: '24.07.2024',
    title: 'Chuyến đi chơi đầu tiên cùng nhau',
    location: 'Vũng Tàu và sinh nhật đặc biệt',
    description:
      'Lần đầu tiên đi xa cùng nhau, đón sinh nhật chung với nhau',
    quote: 'Khi một chuyến đi trở thành ký ức đẹp, địa điểm không còn là nơi chốn nữa mà là cảm giác.',
    tags: ['Road trip', 'Birthday', '2 months'],
    accent: '#fb7185',
    media: [
      {
        type: 'image',
        src: '/images/vtau.jpg',
        alt: 'Khoảnh khắc trong chuyến đi Vũng Tàu',
      }
    ],
  },
  {
    id: 'movie-night',
    date: '07.12.2024',
    title: 'Lần đầu xem phim ở Làng Đại học',
    location: 'Một buổi tối yên bình',
    description:
      'Lần đầu đi đến chỗ anh học, ăn lẩu chỉ có 2 đứa.',
    quote: 'Sự dễ chịu đôi khi chính là thứ khiến một ký ức ở lại lâu nhất.',
    tags: ['Movie night', 'Làng Đại học', 'Soft memories'],
    accent: '#2dd4bf',
    media: [
      {
        type: 'image',
        src: '/images/xemphimlang.jpg',
        alt: 'Kỷ niệm buổi xem phim cùng nhau',
      },
    ],
  },
  {
    id: 'one-year',
    date: '20.04.2025',
    title: 'Tròn một năm yêu nhau',
    location: 'Một cột mốc rất đáng nhớ',
    description:
      'Một năm đi qua với đủ những điều giản dị, vui vẻ, vụng về và yêu thương. Đây là chương kết đẹp cho timeline hiện tại, trước khi tiếp tục viết thêm những phần sau.',
    quote: 'Một năm không chỉ là thời gian, mà là rất nhiều khoảnh khắc đã chọn ở lại cùng nhau.',
    tags: ['1 year', 'Anniversary', 'Still ongoing'],
    accent: '#f97316',
    media: [
      {
        type: 'video',
        src: '/videos/1year.MOV',
        alt: 'Khoảnh khắc của ngày kỷ niệm một năm',
        caption: 'Đi xem pháo hoa tiếp tục.',
      },
      {
        type: 'image',
        src: '/images/6month.JPG',
        alt: 'Kỷ niệm một năm yêu nhau',
        caption: 'Ảnh này là ảnh 6 tháng, bữa đó là cũng đi ăn thịt nướng.',
      },
    ],
  },
  {
    id: 'dating',
    date: '16.05.2025',
    title: 'Đi ăn ốc cùng nhau ở tàu lửa',
    location: 'Nơi chỉ có hai đứa biết',
    description:
      'Hôm này là đi vòng vòng kiếm chỗ ăn, xong ghé vào quán ốc này, anh thấy rất ngon',
    quote: 'Có những điều đẹp nhất trong tình yêu lại là những điều chỉ thuộc về hai người.',
    tags: ['Dating', 'Secret place', 'Just us'],
    accent: '#ec4899',
    media: [
      {
        type: 'image',
        src: '/images/anoc.jpg' ,
        alt: 'Kỷ niệm đi ăn ốc cùng nhau',
      }
    ],
  },
  {
    id: 'birthday-surprise',
    date: '19.07.2025',
    title: 'Sinh nhật của em ở Tân An',
    location: 'Tân An - Nhà của em',
    description:
      'Hôm đó anh chạy xe xuống Tân An đi chơi với em, chơi đu quay em bị rối loạn tiền đình',    
    tags: ['Birthday', 'Surprise', 'Special day'],
    accent: '#f59e0b',
    media: [
      {
        type: 'image',
        src: '/images/birthday.jpg',
        alt: 'Kỷ niệm sinh nhật đặc biệt',
      }
    ],
  },
  {
    id: 'vung-tau-trip-2',
    date: '24.08.2025',
    title: 'Chuyến đi Vũng Tàu lần thứ 2',
    location: 'Vũng Tàu - Biển và nắng',
    description:
      'Lần thứ 2 đi Vũng Tàu, cũng đón sinh nhật chung với nhau ở đây lần 2 luôn',
    quote: 'Điều làm một chuyến đi trở nên đáng nhớ không phải là địa điểm, mà là người cùng đi với bạn.',
    tags: ['Road trip', 'Vũng Tàu', 'Memorable moments'],
    accent: '#f43f5e',
    media: [
      {
        type: 'image',
        src: '/images/vtau2.jpg',
        alt: 'Kỷ niệm chuyến đi Vũng Tàu lần thứ 2',
      }
    ]
   },
   {
    id: 'lunar-new-year',
    date: '09.02.2025',
    title: 'Tết Nguyên đán 2025',
    location: 'Trường của tụi mình',
    description:
      'Một dịp đặc biệt để sum vầy bên nhau và bắt đầu một năm mới.',
    quote: 'Tết là dịp để yêu thương được lan tỏa và những kỷ niệm được tạo ra.',
    tags: ['Lunar New Year', 'Family', 'Special day'],
    accent: '#10b981',
    media: [
      {
        type: 'image',
        src: '/images/tet.JPG',
        alt: 'Kỷ niệm Tết Nguyên đán 2025',
      },
      {
        type: 'image',
        src: '/images/tettet.JPG',
        alt: 'Kỷ niệm Tết Nguyên đán 2025',
      }
    ]
   }
];

export const secretPasscode = '191105';

export const secretLetter = {
  overline: 'Private letter',
  title: 'Lá thư anh cất riêng cho em',
  hint:
    'Khi nhập đúng 6 chữ số, phong bì sẽ xuất hiện.',
  paragraphs: [
    'Gửi em, cảm ơn em vì đã bước vào cuộc sống của anh theo một cách rất dịu dàng nhưng đủ để làm mọi thứ khác đi từng chút một.',
    'Ở bên em, những ngày bình thường cũng trở nên đáng nhớ hơn. Anh thích cảm giác được đi cùng em qua những niềm vui nhỏ, những lúc mệt, những lúc cười rất nhiều và cả những khoảnh khắc chỉ cần im lặng cạnh nhau.',
    'Nếu sau này mình đọc lại lá thư này, anh vẫn muốn giữ nguyên điều đơn giản nhất: anh trân trọng hành trình của hai đứa và mong tụi mình sẽ còn viết thêm thật nhiều chương đẹp nữa.',
  ],
  signature: 'Thương em, Minh Khôi',
};
