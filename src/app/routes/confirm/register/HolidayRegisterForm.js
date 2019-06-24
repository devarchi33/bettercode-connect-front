import React from 'react';
import {Form, DatePicker, Input, Select, Layout, Row, Button} from 'antd';

const Content = Layout.Content;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const TextArea = Input.TextArea;
const Option = Select.Option;

class HolidayRegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.getFieldDecorator = this.props.form.getFieldDecorator;
    }
    render() {
        return (
            <Content>
                <Row>
                    <h3>신청자: 이동훈</h3>
                </Row>
                <Row>
                    <Form onSubmit={(() => console.log('submit!'))}>
                        <FormItem
                            label={'휴가기간'}
                            labelCol={{span: 4}}
                            wapperCol={{span: 20}}
                            hasFeedback>
                            {this.getFieldDecorator('holiday-duration', {
                                rules: [{ type: 'array', required: true, message: '휴가신청 기간은 필수입력 값입니다.'}]
                            })(<RangePicker />)}
                        </FormItem>
                        <FormItem
                            label={'사유'}
                            labelCol={{span: 4}}
                            wrapperCol={{span: 16}}
                            hasFeedback>
                            {this.getFieldDecorator('holiday-reason', {
                                rules: [{type: 'text', required: true, message: '휴가 사유 입력은 필수 입니다.'}]
                            })(<TextArea
                                style={{width: '60%'}}
                                placeholder={'휴가사유 입력'}
                                autosize={{minRows: 2, maxRows: 6}}/>)}
                        </FormItem>
                        <FormItem
                            label={'결제자'}
                            labelCol={{span: 4}}
                            wrapperCol={{span: 16}}
                            hasFeedback>
                            {this.getFieldDecorator('holiday-approver', {
                                rules: [{type: 'text', required: true, message: '승인자 선택은 필수 입니다.'}]
                            })(<Select
                                style={{width: '60%'}}
                                placeholder={'승인자를 선택해주세요.'}>
                                <Option value={'tony'}>{'안영회'}</Option>
                            </Select>)}
                        </FormItem>
                        <FormItem wrapperCol={{offset: 4, span: 12}}>
                            <Button type={'primary'} htmlType={'submit'}>
                                신청
                            </Button>
                        </FormItem>
                    </Form>
                </Row>
            </Content>
        );
    };
}

export default Form.create({ name: 'holiday-register-form'})(HolidayRegisterForm);