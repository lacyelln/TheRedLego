export default function Academic() {
    const [posts, getPosts] = React.useState(null);
    React.useEffect(() => {
        fetch("/api/list")
        .then((response) => response.json())
        .then((postList) => {
            console.log(JSON.stringify(postList));
            getPosts(CreatePosts(postList, navigate, true));
        })
    }, []);

    return (
        //
    )
}