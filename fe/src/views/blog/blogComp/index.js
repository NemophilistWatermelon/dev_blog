export default {
    name: "blogImg",
    created() {
        document.title = "Blog·of·KEVIN - 於捨雜談";
    },
    beforeDestroy() {
        document.title = "Kevin";
    }
};