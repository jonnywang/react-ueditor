import React from 'react'
import ReactUeditor from '../src'

class SimpleExample extends React.Component {

    value = '<section>hllo</section>'
    ueditor = null

    updateEditorContent = content => {
        console.log(content)
    }

    changeHtml = () => {
        this.value += 'hello'
        if (this.ueditor) {
            this.ueditor.setContent(this.value)
        }
    }

    onReady = (ueditor) => {
        this.ueditor = ueditor
        ueditor.setContent(this.value)
    }

    render() {
        return <div>
            <ReactUeditor
                config={{toolbars: [['fullscreen', 'source', 'undo', 'redo', 'bold']]}}
                ueditorPath='../vendor/ueditor'
                onChange={this.updateEditorContent}
                onReady={this.onReady}
            />
            <button onClick={this.changeHtml}>修改</button>
        </div>
    }

}

export default SimpleExample
