/**
 * 锚点跳转---平滑
 */
export default function handleAnchor(anchor, block = "start"){
    document.querySelector(anchor)?.scrollIntoView({
        block,
        behavior: "smooth",
    });
};
