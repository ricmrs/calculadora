function handleClickClean(){
    $result.textContent = $value1.textContent = $value2.textContent = $oper.textContent = $equal.textContent = ""
}

function handleClickBks(){
    let value = $value1;

    if($equal.textContent){
        handleClickClean();
        return;
    }

    if($oper.textContent){
        value = $value2;
    }

    len = value.textContent.length
    value.textContent = (value.textContent).slice(0, len-1)
}

function handleClickNum(event){
    if($result.textContent){
        $result.textContent = $value1.textContent = $value2.textContent = $oper.textContent = $equal.textContent = "";
        handleClickNum(event);
        return;
    }

    $button = event.target;

    if($oper.textContent){
        $value2.textContent +=  $button.textContent;
        return;
    }

    $value1.textContent +=  $button.textContent;
}

function handleClickOp(event){
    if($value2.textContent){
        return;
    }

    $button = event.target;
    $oper.textContent =  $button.textContent;
}

function handleClickEqual(){
    if(!$value1.textContent || !$value2.textContent){
        return;
    }

    $equal.textContent = "=" ;

    let value1 = parseInt($value1.textContent);
    let value2 = parseInt($value2.textContent);
    let oper = $oper.textContent;
    let result;

    switch(oper){
        case '+':
            result = value1 + value2;
            break;
        case '-':
            result = value1 - value2;
            break;
        case 'x':
            result = value1 * value2;
            break;
        case '/':
            result = value1 / value2;
            if(value1 % value2 != 0) {
                result = result.toFixed(2)
            }
            break;
    }

    $result.textContent = result;
}

function convertToHtml(virtualNode) {
    if(typeof virtualNode === 'string' || typeof virtualNode === 'number'){
        return document.createTextNode(`${virtualNode}`);
    }

    const $domElement = document.createElement(virtualNode.tagName)

    virtualNode.props.children.forEach((virtualChild) => {
        $domElement.appendChild(convertToHtml(virtualChild));
    })

    if(virtualNode.props.className){
        $domElement.classList.add(virtualNode.props.className);
    }

    if(virtualNode.props.id){
        $domElement.setAttribute("id", virtualNode.props.id);
    }

    if(virtualNode.props.handleClick){
        $domElement.setAttribute("onclick", `${virtualNode.props.handleClick}`);
    }

    return $domElement;
}

function render(initialVirtualTree, $domRoot) {
    // console.log(initialVirtualTree)
    // console.log(JSON.stringify(initialVirtualTree, null, 4));
    const $appHTML = convertToHtml(initialVirtualTree);
    $domRoot.appendChild($appHTML);
}

function createElement(elementType, props, ...children){
    const virtualElementProps = {
        ...props,
        children
    }

    if(typeof elementType === "function") {
       return elementType(props);
    }

    return {
        tagName: elementType,
        props: virtualElementProps
    };
};

const React = {
    createElement,
};

function App(props) {
    return (
        React.createElement(
            "div",
            {
                className: "calculadora"
            },
            React.createElement("h1", {className: "title"}, "Calculadora"),
            React.createElement("div", {className: "visor"},
                React.createElement("div", {className: "visor-num", id: "value1"}),
                React.createElement("div", {className: "visor-op", id: "oper"}),
                React.createElement("div", {className: "visor-num", id: "value2"}),
                React.createElement("div", {className: "visor-op", id:"equal"}),
                React.createElement("div", {className: "visor-num", id: "result"}),),
            React.createElement("button", {handleClick: 'handleClickClean()'}, "LIMPAR"),
            React.createElement("button", {handleClick: 'handleClickBks()'}, "←"),
            React.createElement("button", {handleClick: 'handleClickOp(event)'}, "/"),
            React.createElement("button", {handleClick: 'handleClickOp(event)'}, "x"),
            React.createElement("button", {handleClick: 'handleClickNum(event)'}, "7"),
            React.createElement("button", {handleClick: 'handleClickNum(event)'}, "8"),
            React.createElement("button", {handleClick: 'handleClickNum(event)'}, "9"),
            React.createElement("button", {handleClick: 'handleClickOp(event)'}, "-"),
            React.createElement("button", {handleClick: 'handleClickNum(event)'}, "4"),
            React.createElement("button", {handleClick: 'handleClickNum(event)'}, "5"),
            React.createElement("button", {handleClick: 'handleClickNum(event)'}, "6"),
            React.createElement("button", {handleClick: 'handleClickOp(event)'}, "+"),
            React.createElement("button", {handleClick: 'handleClickNum(event)'}, "1"),
            React.createElement("button", {handleClick: 'handleClickNum(event)'}, "2"),
            React.createElement("button", {handleClick: 'handleClickNum(event)'}, "3"),
            React.createElement("button", {id:"equal", handleClick: 'handleClickEqual()'}, "="),
            React.createElement("button", {id:"num0", handleClick: 'handleClickNum(event)'}, "0"),
        )
    );
}

render(React.createElement(App, null), document.querySelector('#main'));

const $value1 = document.querySelector('#value1');
const $value2 = document.querySelector('#value2');
const $oper = document.querySelector('#oper');
const $equal = document.querySelector('#equal');
const $result = document.querySelector('#result');
