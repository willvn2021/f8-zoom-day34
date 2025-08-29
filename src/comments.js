const { useState, useEffect } = React;
// Avatar
const avatarURL = (name = "") => {
    const encodedName = encodeURIComponent(name);
    return `https://ui-avatars.com/api/?name=${encodedName}&background=random&color=random&bold=true`;
};
// Tạo thời gian giả bình luận
const fakeAgoById = (id) => {
    const minutes = ((id * 37) % (7 * 24 * 60)) + 5;
    return minutesToAgo(minutes);
};

// Upcase chữ đầu tiên
const capFirst = (str = "") => str[0].toLocaleUpperCase() + str.slice(1);

// Cắt dòng quá 20 từ
const truncate = (str = "", n = 20) =>
    str.length > n ? str.slice(0, n).trimEnd() + "..." : str;

const minutesToAgo = (minute) => {
    switch (true) {
        case minute < 1:
            return `vừa xong`;
        case minute < 60:
            return `${minute} phút trước`;
        case minute < 60 * 24:
            return `${Math.floor(minute / 60)} giờ trước`;

        default:
            return `${Math.floor(minute / 60 / 24)} ngày trước`;
    }
};

function CommentItem({ comment }) {
    return (
        <div className="item">
            <img
                className="avatar"
                src={avatarURL(comment.name)}
                alt={comment.name}
            />
            <div>
                <div className="header">
                    <span className="name">
                        {truncate(capFirst(comment.name))}
                    </span>
                    <a className="email" href={`mailto:${comment.email}`}>
                        {comment.email}
                    </a>
                    <span className="ago">{comment.ago}</span>
                </div>
                <div className="body">{comment.body}</div>
            </div>
        </div>
    );
}

function CommentsApp() {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    // form state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [body, setBody] = useState("");

    useEffect(() => {
        setTimeout(() => {
            fetch("https://jsonplaceholder.typicode.com/comments?postId=1")
                .then((response) => response.json())
                .then((data) =>
                    setComments(
                        data.map((comment) => ({
                            ...comment,
                            ago: fakeAgoById(comment.id),
                        }))
                    )
                )
                .finally(() => setLoading(false));
        }, 1000);
    }, []);

    // Submit Bình luận
    const onSubmit = (e) => {
        e.preventDefault();
        const trimmedName = name.trim();
        const trimmedBody = body.trim();
        if (!trimmedName || !trimmedBody) return;

        const newComment = {
            id: comments.length + 1,
            name: trimmedName,
            email: email.trim() || "no-email@example.com",
            body: trimmedBody,
            ago: "vừa xong",
        };

        setComments((scmt) => [newComment, ...scmt]);
        setName("");
        setEmail("");
        setBody("");
    };

    console.log(comments);

    // Chờ phản hồi Api trả ra text Loading
    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="container">
            <h1>Bình luận</h1>
            <div className="sub">- thêm bình luận</div>

            <form className="composer" onSubmit={onSubmit}>
                <div className="row">
                    <input
                        placeholder="Tên của bạn"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email (tùy chọn)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="row">
                    <textarea
                        placeholder="Nhập nội dung bình luận…"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                </div>
                <div className="actions">
                    <button
                        className="btn primary"
                        type="submit"
                        disabled={!name.trim() || !body.trim()}
                    >
                        Gửi bình luận
                    </button>
                </div>
            </form>

            {!loading && (
                <div className="list">
                    {comments.map((comment) => (
                        <CommentItem key={comment.id} comment={comment} />
                    ))}
                </div>
            )}
        </div>
    );
}

const app = (
    <>
        <CommentsApp />
    </>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(app);
