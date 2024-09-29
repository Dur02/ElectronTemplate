import { ConfigProvider, Menu } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { useCallback } from 'react'

type MenuItem = Required<MenuProps>['items'][number]

const App: React.FC = () => {
  const items: MenuItem[] = [
    {
      label: 'Dev',
      key: 'Dev',
      className: 'no-drag',
      popupOffset: [-5, -5],
      children: [
        {
          label: (
            <div className="flex justify-between gap-6">
              <div>Toggle Developer Tools</div>
              <div>Shift + Ctrl + I</div>
            </div>
          ),
          key: 'Toggle Developer Tools',
          className: 'select-none',
        },
        {
          label: (
            <div className="flex justify-between gap-6">
              <div>Reload</div>
              <div>Ctrl + R</div>
            </div>
          ),
          key: 'Reload',
          className: 'select-none',
        },
      ],
    },
    {
      label: 'View',
      key: 'View',
      className: 'no-drag',
      popupOffset: [-5, -5],
      children: [
        {
          label: (
            <div className="flex justify-between gap-6">
              <div
                onClick={() => window.electronApi.send('openLink', 'https://www.electronjs.org/')}
              >
                Official Website
              </div>
            </div>
          ),
          key: 'Official Website',
          className: 'select-none',
        },
        {
          label: (
            <div className="flex justify-between gap-6">
              <div>FullScreen</div>
              <div>F11</div>
            </div>
          ),
          key: 'FullScreen',
          className: 'select-none',
        },
      ],
    },
  ]

  const handleMenuClick = useCallback(({ key }: { key: string }) => {
    switch (key) {
      case 'Toggle Developer Tools':
      case 'Reload':
      case 'FullScreen': {
        window.electronApi.send('clickOnMenu', key)
        break
      }
      default: {
        break
      }
    }
  }, [])

  return (
    <>
      <header className="drag sticky bottom-0 top-0 z-50 flex h-8 w-full items-center justify-between bg-white">
        <div className="w-2/5 select-none">
          <ConfigProvider
            theme={{
              components: {
                Menu: {
                  activeBarBorderWidth: 0,
                  activeBarHeight: 0,
                  horizontalLineHeight: '32px',
                  horizontalItemHoverBg: 'rgba(0, 0, 0, 0.06)',
                  itemPaddingInline: 8,
                  itemHeight: 25,
                  itemHoverBg: 'rgba(0, 0, 0, 0.06)',
                  itemMarginBlock: 4,
                  itemMarginInline: 4,
                  fontSize: 13,
                  padding: 4,
                },
              },
            }}
          >
            <Menu
              className="border-b-0"
              selectable={false}
              triggerSubMenuAction="click"
              mode="horizontal"
              items={items}
              onClick={handleMenuClick}
              overflowedIndicator={<EllipsisOutlined className="no-drag" />}
            />
          </ConfigProvider>
        </div>
        <div className="w-fit">
          <h1 className="mx-auto hidden w-fit select-none text-sm sm:block">中文标题</h1>
        </div>
        <div className="h-8 w-2/5" />
      </header>
      <main className="scroll flex h-[calc(100vh-theme('height.8'))] flex-wrap overflow-y-auto">
        <div className="h-[900px]">
          <p>jknougurfygtbh</p>
          <input type="text" />
        </div>
      </main>
    </>
  )
}

export default App
