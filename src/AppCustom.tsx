// import { useEffect, useMemo, useRef, useState } from 'react'
// import ResizeObserver from 'resize-observer-polyfill'

// const App: React.FC = () => {
//   const allMenus = useMemo(() => ['文件', '编辑', '查看', '转到', '运行', '终端', '帮助'], [])

//   const menuContainerRef = useRef(null)
//   const menuRef = useRef<(HTMLLIElement | null)[]>([])
//   const [lastMenuIndex, setLastMenuIndex] = useState(-1)
//   const [menuItems, setMenuItems] = useState(allMenus)

//   useEffect(() => {
//     const ro = new ResizeObserver((entries) => {
//       for (const entry of entries) {
//         const { width } = entry.contentRect
//         let menuContainerWidth = width - 30
//         let lastIndex = -1
//         for (let i = 0; i < menuRef.current.length; i++) {
//           const menuWidth = menuRef.current[i]?.offsetWidth
//           if (menuContainerWidth - menuWidth! > 0) {
//             menuContainerWidth -= menuWidth!
//             lastIndex = i
//           } else {
//             console.log([...allMenus.slice(0, i + 1), '...', ...allMenus.slice(i + 1)])
//             console.log(lastIndex)
//             setMenuItems([...allMenus.slice(0, i + 1), '...', ...allMenus.slice(i + 1)])
//             setLastMenuIndex(lastIndex)
//             break
//           }
//         }
//       }
//     })

//     ro.observe(menuContainerRef.current!)
//   }, [menuContainerRef, menuRef, allMenus])

//   return (
//     <>
//       <header className="drag sticky bottom-0 top-0 z-50 flex h-8 w-full items-center justify-between gap-1 bg-white px-1">
//         <div className="w-1/3" ref={menuContainerRef}>
//           <ul className="no-drag flex h-8 select-none overflow-y-visible">
//             {menuItems.map((item, index) => (
//               <li
//                 className="group/operation relative min-w-fit px-2 hover:bg-slate-200 hover:underline"
//                 ref={(el) => (menuRef.current[index] = el)}
//                 key={item}
//               >
//                 <p className="leading-8">{item}</p>
//                 <div className="invisible absolute left-0 w-40 origin-top-left divide-y divide-gray-100 rounded-md bg-white opacity-0 shadow-lg transition duration-300 group-hover/operation:visible group-hover/operation:opacity-100">
//                   <div className="py-1">
//                     <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                       Option 1
//                     </a>
//                     <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                       Option 2
//                     </a>
//                     <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                       Option 3
//                     </a>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="w-1/3">
//           <h1 className="mx-auto hidden h-8 w-fit select-none leading-8 sm:block">Test</h1>
//         </div>
//         <div className="h-8 w-1/3" />
//       </header>
//       <main className="scroll flex h-[calc(100vh-theme('height.8'))] flex-wrap overflow-y-auto">
//         <div className="h-[900px]">
//           <p>jknougurfygtbh</p>
//         </div>
//       </main>
//     </>
//   )
// }

// export default App
