const fgp_loader = document.createElement("fgp-loader");
fgp_loader.innerHTML = /* html */ `
<style>
    fgp-loader {
        font: calc((100vh + 100vw)/ 100) verdana;
        color: #777;
        background: #fffd;
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        z-index: 9;
    }
    fgp-loader .spinner {
        font-size: calc(1vw / 2);
        border: 1em solid;
        border-top: 1em solid transparent;
        width: 30em;
        max-width: 5rem;
        height: 30em;
        max-height: 5rem;
        border-radius: 50%;
        animation: rotate 1s ease infinite;
    }
    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }
    fgp-loader .title {
        animation: opacity 2s infinite;
    }
    @keyframes opacity {
        50% {
            opacity: 0.2;
        }
    }
</style>
<div class="spinner"></div>
<h2 class="title">Loading...</h2>
`;
document.body.appendChild(fgp_loader);

window.addEventListener("load", () => {
    fgp_loader.remove();
})