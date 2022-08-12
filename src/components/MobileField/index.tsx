import {useState, FC} from 'react';
import {Input, Picker, Space} from 'antd-mobile'
import type {PickerValue} from 'antd-mobile/es/components/picker'
import {DownOutline} from 'antd-mobile-icons'

const columns = [['86', '01', '02', '03']];

interface MobileFieldProps {
  value?: MobileValue
  onChange?: (value: MobileValue) => void
}

interface MobileValue {
  preValue: string
  realValue: string
}


const MobileField: FC<MobileFieldProps> = ({
                                             value = {preValue: '86', realValue:''},
                                             onChange,
                                           }) => {
  const [visible, setVisible] = useState(false)

  const triggerValue = (changedValue: Partial<MobileValue>) => {
    onChange?.({...value, ...changedValue})
  }

  const onRealValueChange = (value: string) => {
    triggerValue({realValue: value})
  }

  const onPreValueChange = (value: PickerValue[]) => {
    const v = value[0]
    if (v === null) return
    triggerValue({preValue: v})
  }
  return (
    <>
      <Space align='center'>
        <Space align='center' onClick={() => setVisible(true)}>
          <div>+{value.preValue}</div>
          <DownOutline/>
        </Space>
        <Input
          placeholder='请输入手机号'
          value={value.realValue}
          onChange={onRealValueChange}
        />
      </Space>
      <Picker
        columns={columns}
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
        value={[value.preValue]}
        onConfirm={onPreValueChange}
      />
    </>
  )
}
export default MobileField;