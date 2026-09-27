/* =====================================================================
   MATH – cấu hình MathJax 3 và tự vẽ công thức mỗi khi nội dung đổi.
   Nội dung viết LaTeX trong \( … \) (trong dòng) hoặc \[ … \] (riêng dòng) – xem tm/td/tb trong core.js.
   Nạp TRƯỚC assets/vendor/mathjax/tex-chtml.js. Nếu MathJax không tải được, web vẫn chạy (hiện mã LaTeX thô).
   ===================================================================== */
window.MathJax = {
  loader: { load: [] },
  tex: { inlineMath: [['\\(', '\\)']], displayMath: [['\\[', '\\]']], processEscapes: false },
  chtml: { scale: 1.05, matchFontHeight: false, displayAlign: 'left', displayIndent: '0' },
  options: { enableMenu: false, ignoreHtmlClass: 'no-math', processHtmlClass: 'math' },
  startup: {
    typeset: false,
    ready() {
      MathJax.startup.defaultReady();
      MathJax.startup.promise.then(() => MathTS.start());
    },
  },
};

const MathTS = (() => {
  let queued = new Set(), timer = null, busy = Promise.resolve();
  const HAS = /\\\(|\\\[/;
  function flush() {
    timer = null;
    const nodes = [...queued]; queued.clear();
    if (!window.MathJax || !MathJax.typesetPromise) return;
    busy = busy.then(async () => {
      for (const n of nodes) {
        if (!n.isConnected || !HAS.test(n.textContent)) continue;
        try { await MathJax.typesetPromise([n]); }
        catch (e) { if (n.isConnected) setTimeout(() => add(n), 30); }   // nội dung vừa bị thay khi đang vẽ → vẽ lại
      }
    });
  }
  function add(n) {
    if (!n || n.nodeType !== 1) n = n && n.parentElement;
    if (!n || n.closest('mjx-container')) return;
    queued.add(n); if (!timer) timer = setTimeout(flush, 0);
  }
  function start() {
    add(document.body);
    new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(add)))
      .observe(document.body, { childList: true, subtree: true });
  }
  return { start, typeset: add };
})();
