/**
 * Created by InnF on 2018/5/17.
 */

import React from 'react'
import {
    Col,
    Row,
    Form,
    Select,
    Button,
    Slider,
    Upload,
    Icon,
    Rate,
    Input,
    InputNumber,
    message,
    Tabs,
    Divider
} from 'antd';
import IconTitle from '../iconTitle/IconTitle'
import './MovieResourceManage.css'
import Api from '../Api'

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;
const TabPane = Tabs.TabPane;

class MovieResourceManage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            post: 'http://via.placeholder.com/300x150?text=post',
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    onHandleChangePostUrl(e) {
        const {value} = e.target;
        const reg = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/;
        if ((reg.test(value))) {
            this.setState({post: value});
        }
    };

    render() {

        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };
        const props = {
            name: 'file',
            action: Api.playMovie(),
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };

        return (
            <div>
                <IconTitle/>
                <br/>
                <br/>
                <Row>
                    <Col span={5}/>
                    <Col span={14}>
                        <div id="pad">
                            <Divider orientation="left"><h2>电影资源管理</h2></Divider>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab={<span><Icon type="cloud-upload" />资源上传</span>} key="1">
                                    <div id="info">
                                        <Form>
                                            <FormItem
                                                {...formItemLayout}
                                                label="电影名">
                                                {getFieldDecorator('title', {
                                                    rules: [{required: true, message: '请输入电影名！'}],
                                                })(
                                                    <Input />
                                                )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="评分"
                                            >
                                                {getFieldDecorator('score')(
                                                    <Slider max="10"
                                                            step="0.1"
                                                            marks={{
                                                                0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5',
                                                                6: '6', 7: '7', 8: '8', 9: '9', 10: '10'
                                                            }}/>
                                                )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="别名">
                                                {getFieldDecorator('alias', {
                                                    rules: [{required: true, message: '请输入电影别名！'}],
                                                })(
                                                    <Input />
                                                )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="时长"
                                            >
                                                {getFieldDecorator('length', {initialValue: 120})(
                                                    <InputNumber min={1}/>
                                                )}
                                                <span className="ant-form-text"> 分钟</span>
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="上映日期">
                                                {getFieldDecorator('releaseDate', {
                                                    rules: [{required: true, message: '请输入电影电影上映日期！'}],
                                                })(
                                                    <Input/>
                                                )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="导演">
                                                {getFieldDecorator('director', {
                                                    rules: [{required: true, message: '请输入导演！'}],
                                                })(
                                                    <Select
                                                        mode="tags"
                                                        style={{width: '100%'}}
                                                        tokenSeparators={[',']}/>
                                                )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="编剧">
                                                {getFieldDecorator('screenwriter', {
                                                    rules: [{required: true, message: '请输入编剧！'}],
                                                })(
                                                    <Select
                                                        mode="tags"
                                                        style={{width: '100%'}}
                                                        tokenSeparators={[',']}/>
                                                )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="主演">
                                                {getFieldDecorator('cast', {
                                                    rules: [{required: true, message: '请输入主演！'}],
                                                })(
                                                    <Select
                                                        mode="tags"
                                                        style={{width: '100%'}}
                                                        tokenSeparators={[',']}/>
                                                )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="电影类型"
                                                hasFeedback>
                                                {getFieldDecorator('type', {
                                                    rules: [
                                                        {required: true, message: '请选择电影类型！'},
                                                    ],
                                                })(
                                                    <Select mode="tags"
                                                            style={{width: '100%'}}
                                                            tokenSeparators={[',']}
                                                            placeholder="选择电影类型">
                                                        <Option value="剧情">剧情</Option>
                                                        <Option value="喜剧">喜剧</Option>
                                                        <Option value="惊悚">惊悚</Option>
                                                        <Option value="动作">动作</Option>
                                                        <Option value="爱情">爱情</Option>
                                                        <Option value="犯罪">犯罪</Option>
                                                        <Option value="恐怖">恐怖</Option>
                                                        <Option value="冒险">冒险</Option>
                                                        <Option value="悬疑">悬疑</Option>
                                                        <Option value="科幻">科幻</Option>
                                                        <Option value="家庭">家庭</Option>
                                                        <Option value="奇幻">奇幻</Option>
                                                        <Option value="动画">动画</Option>
                                                        <Option value="战争">战争</Option>
                                                        <Option value="历史">历史</Option>
                                                        <Option value="传记">传记</Option>
                                                        <Option value="音乐">音乐</Option>
                                                        <Option value="歌舞">歌舞</Option>
                                                        <Option value="运动">运动</Option>
                                                        <Option value="西部">西部</Option>
                                                        <Option value="纪录片">纪录片</Option>
                                                    </Select>
                                                )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="海报">
                                                {getFieldDecorator('post', {
                                                    rules: [{required: true, message: '请输入海报 URL！'}],
                                                })(
                                                    <div>
                                                        <Input
                                                            onChange={this.onHandleChangePostUrl.bind(this)}/>
                                                        <img src={this.state.post} alt="post"/>
                                                    </div>
                                                )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="剧情">
                                                {getFieldDecorator('overview', {
                                                    rules: [{required: true, message: '请输入剧情！'}],
                                                })(
                                                    <TextArea rows={4}/>
                                                )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="电影资源上传"
                                                extra="选择本地MP4电影资源"
                                            >
                                                {getFieldDecorator('upload', {
                                                    valuePropName: 'fileList',
                                                    getValueFromEvent: this.normFile,
                                                })(
                                                    <Upload {...props}>
                                                        <Button>
                                                            <Icon type="upload"/> 点击上传
                                                        </Button>
                                                    </Upload>
                                                )}
                                            </FormItem>
                                            <FormItem
                                                wrapperCol={{ span: 12, offset: 6 }}
                                            >
                                                <Button type="primary" htmlType="submit"> 上 传 </Button>
                                            </FormItem>
                                        </Form>
                                    </div>
                                </TabPane>
                                <TabPane tab={<span><Icon type="delete" />电影删除</span>} key="2">
                                    <h1>Delete</h1>
                                </TabPane>
                            </Tabs>
                        </div>

                    </Col>
                    <Col span={5}/>
                </Row>
            </div>
        )
    }
}

export default MovieResourceManage = Form.create({})(MovieResourceManage);
