const { useState, useEffect } = React;
// Upcase từng từ trong tiêu đề
const titleCase = (str = "") =>
    str.replace(
        /\w\S*/g,
        (word) => word[0].toLocaleUpperCase() + word.slice(1)
    );
// Upcase chữ đầu tiên
const capFirst = (str = "") => str[0].toLocaleUpperCase() + str.slice(1);

// Cắt dòng quá 100 từ
const truncate = (str = "", n = 100) =>
    str.length > n ? str.slice(0, n).trimEnd() + "..." : str;

function Modal({ open, onClose, post }) {
    React.useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open || !post) return null;

    return (
        <div className="overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button
                    className="close"
                    onClick={onClose}
                    aria-label="Đóng"
                ></button>
                <h2>{titleCase(post.title)}</h2>
                <div className="meta">
                    ID: {post.id} • User: {post.userId}
                </div>
                <p>{capFirst(post.body)}</p>
            </div>
        </div>
    );
}

function Products() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMore, setViewMore] = useState(null);

    React.useEffect(() => {
        setTimeout(() => {
            fetch("https://jsonplaceholder.typicode.com/posts?_limit=12")
                .then((response) => response.json())
                .then((json) => setPosts(json))
                .finally(() => setLoading(false));
        }, 1000);
    }, []);

    console.log(posts);
    // Chờ phản hồi Api trả ra text Loading
    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="container">
            <h1>Products Post</h1>
            <div className="sub">Danh sách bài viết: {posts.length} post</div>

            <div className="grid">
                {posts.map((post) => (
                    <article className="card" key={post.id}>
                        <span className="idfill">ID #{post.id}</span>
                        <h2 className="title">{titleCase(post.title)}</h2>
                        <p className="body">
                            {capFirst(
                                truncate(post.body.replace(/\n/g, " "), 100)
                            )}
                        </p>
                        <div className="actions">
                            <button
                                className="btn primary"
                                onClick={() => setViewMore(post)}
                            >
                                Xem chi tiết
                            </button>
                        </div>
                    </article>
                ))}
            </div>

            <Modal
                open={!!viewMore}
                post={viewMore}
                onClose={() => setViewMore(null)}
            />
        </div>
    );
}

const app = (
    <>
        <Products />
    </>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(app);
