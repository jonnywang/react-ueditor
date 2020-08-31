import React from 'react'
import ReactUeditor from '../src'

class AsyncExample extends React.Component {

    constructor() {
        super()
        this.editorResult = ''
        this.state = {
            content: '',
        }
        this.timer = null
        this.ueditor = null
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.setState({
                content: '我是异步加载回来的数据',
            }, () => {
                if (this.ueditor) {
                    this.ueditor.setContent(this.state.content)
                }
            })
        }, 2000)
    }

    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    updateEditorContent = content => {
        // 通过 editroResult 获取编辑器最新内容，而不是对 content 进行 setState（因为 ueditor 不是一个受控组件）
        this.editorResult = content
    }

    onReady = (ueditor) => {
        this.ueditor = ueditor
    }

    render() {
        return (
            <div>
                <ReactUeditor
                    ueditorPath='../vendor/ueditor'
                    onChange={this.updateEditorContent}
                    onReady={this.onReady}
                />
            </div>
        )
    }

}

export default AsyncExample
