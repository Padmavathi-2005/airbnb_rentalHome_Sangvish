export const scrollToTop = (smooth = false) => {
    window.scrollTo({
        top: 0,
        behavior: smooth ? "smooth" : "auto",
    });
};


// import and scrollToTop(true);