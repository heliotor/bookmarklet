javascript:(function(){
    let title = window.prompt('Format Link as Markdown', '[' + document.title + '](' + window.location.href + ')');
    if (title == null) return;
    let lines = ['[' + document.title + '](' + window.location.href + ')'];
    let quote = window.getSelection().toString();
    if (quote.trim()) {
        lines=lines.concat(quote.split(/\n/g).map(function(line) {
            if (line !== '') {
                return '- > ' + line;
            };
        }));
    };
    let lines2 = [];
    for (let i = 0; i < lines.length; ++i) {
        if (lines[i] !== undefined) { 
            lines2.push(lines[i]);
        };
    };
    lines2.push('');
    let text = lines2.join('\n');
    if (title == '[' + document.title + '](' + window.location.href + ')') { 
        title = '';
    };
    if (title == '' && quote == '') {
        text = lines2.join(' ');
    } else if (title == '') {
        text = text;
    } else {
        text = text + '- ' + title;
    };
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function() {
            // コピーに成功した場合
        }).catch(function(error) {
            // コピーに失敗した場合
            // HTML5 の execCommand メソッドを使用する
            try {
                const copyFrom = document.createElement("textarea");
                copyFrom.textContent = text;
                document.body.appendChild(copyFrom);
                copyFrom.select();
                document.execCommand("copy");
                document.body.removeChild(copyFrom);
            } catch (error) {
                // execCommand メソッドが失敗した場合
                alert("Failed to copy.");
            }
        });
    } else {
            // クリップボード API がサポートされていない場合
            // HTML5 の execCommand メソッドを使用する
        try {
            const copyFrom = document.createElement("textarea");
            copyFrom.textContent = text;
            document.body.appendChild(copyFrom);
            copyFrom.select();
            document.execCommand("copy");
            document.body.removeChild(copyFrom);
        } catch (error) {
            // execCommand メソッドが失敗した場合
            alert("Failed to copy.");
        }
    };
})();
