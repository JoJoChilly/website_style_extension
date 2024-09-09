function copyTextToClipboard(text) {
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showToast();
}

function addCopyButton(element) {
    // 合计数值
    const copyButton = document.createElement('button');
    copyButton.innerHTML = '复制';
    copyButton.classList.add('copy-button');
    copyButton.onclick = () => {
        // if (element.querySelector('.segmenta_index_usersLink_33PeOf')) {
        //     copyTextToClipboard(element.querySelector('.segmenta_index_usersLink_33PeOf').textContent);
        // } else {
        //     copyTextToClipboard(element.textContent.replace('复制', ''));
        // }

        if (element.querySelector("[class^='segmenta_index_usersLink_']")) {
            copyTextToClipboard(element.querySelector("[class^='segmenta_index_usersLink_']").textContent);
        } else {
            copyTextToClipboard(element.textContent.replace('复制', ''));
        }
    };
    element.appendChild(copyButton);
}

function addCopyButton2(element) {
    // 同比数据
    const copyButton = document.createElement('button');
    copyButton.innerHTML = '复制';
    copyButton.classList.add('copy-button-percent');
    copyButton.onclick = () => {
        copyTextToClipboard(element.textContent.replace(/复制$/, ''));
    };
    element.appendChild(copyButton);
}

function addCopyButton3(element) {
    // 对比数据
    const copyButton = document.createElement('button');
    copyButton.innerHTML = '复制';
    copyButton.classList.add('copy-button');
    copyButton.onclick = () => {
        // copyTextToClipboard(element.querySelector('.segmenta_index_usersLink_33PeOf').textContent);
        copyTextToClipboard(element.querySelector("[class^='segmenta_index_usersLink_']").textContent);
    };
    element.appendChild(copyButton);
}

function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(function () {
        toast.classList.remove('show');
    }, 1000);
}

async function copyTableToClipboard() {
    const table1 = document.querySelector('.rc-table-header table').cloneNode(true);
    const table2 = document.querySelector('.rc-table-body table').cloneNode(true);
    const table1Content = table1.querySelectorAll('tr');
    const table2Content = table2.querySelectorAll('tr');

    const tables = [table1, table2];

    // 在每个 <strong> 标签后添加 <br>
    for (const table of tables) {
        const strongTags = table.querySelectorAll('strong');
        for (const strongTag of strongTags) {
            const br = document.createElement('br');
            strongTag.parentNode.insertBefore(br, strongTag.nextSibling);
        }
        const spanTags = table.querySelectorAll('span');
        for (const spanTag of spanTags) {
            const br = document.createElement('br');
            spanTag.parentNode.insertBefore(br, spanTag.nextSibling);
        }
    }

    let mergedTableHtml = '<table>';
    for (const row of table1Content) {
        mergedTableHtml += row.outerHTML;
    }
    for (const row of table2Content) {
        mergedTableHtml += row.outerHTML;
    }
    mergedTableHtml += '</table>';

    // 创建一个包含 HTML 和纯文本数据的剪切板项
    const clipboardItem = new ClipboardItem({
        'text/html': new Blob([mergedTableHtml], { type: 'text/html' }),
        'text/plain': new Blob([table1.innerText + '\n' + table2.innerText], { type: 'text/plain' }),
    });

    try {
        await navigator.clipboard.write([clipboardItem]);
        console.log('Merged tables copied as HTML');
    } catch (err) {
        console.error('Failed to copy merged tables as HTML:', err);
    }
}

const toggleCopyButton = document.createElement('button');
toggleCopyButton.id = 'toggle-copy-button';
toggleCopyButton.innerHTML = '展示复制按钮';
let isShow = true;

toggleCopyButton.addEventListener('click', () => {
    // 点击“展示复制按钮”
    if (isShow) {
        // document.querySelectorAll('.segmenta_index_val_52o877').forEach(el => addCopyButton(el));
        // document.querySelectorAll('.segmenta_index_changeVal_5oKCi7').forEach(el => addCopyButton2(el));
        // document.querySelectorAll('.segmenta_index_compareVal_3fm4O6').forEach(el => addCopyButton3(el));
        document.querySelectorAll("[class^='segmenta_index_val_']").forEach(el => addCopyButton(el));
        document.querySelectorAll("[class^='segmenta_index_changeVal_']").forEach(el => addCopyButton2(el));
        document.querySelectorAll("[class^='segmenta_index_compareVal_']").forEach(el => addCopyButton3(el));

        toggleCopyButton.innerHTML = '隐藏复制按钮';
        toggleCopyButton.classList.add('hide-copy');
        isShow = false;
    } else {
        document.querySelectorAll('.copy-button').forEach(el => el.remove());
        document.querySelectorAll('.copy-button-percent').forEach(el => el.remove());
        toggleCopyButton.classList.remove('hide-copy');
        isShow = true;
        toggleCopyButton.innerHTML = '展示复制按钮';
    }
});

document.body.appendChild(toggleCopyButton);

const toggleCopyTableButton = document.createElement('button');
toggleCopyTableButton.id = 'toggle-copy-table-button';
toggleCopyTableButton.innerHTML = '复制表格内容';

toggleCopyTableButton.addEventListener('click', () => {
    copyTableToClipboard();
    showToast();
});
document.body.appendChild(toggleCopyTableButton);

// 创建 toast 元素
const toast = document.createElement('div');
toast.className = 'toast';
toast.id = 'toast';
toast.textContent = '已复制到剪切板';
document.body.appendChild(toast);
