import {
    BarChartOutlined,
    FormOutlined,
    FileTextOutlined,
    FileDoneOutlined,
    HomeOutlined,
    LogoutOutlined,
    CloudDownloadOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme,  Button, Drawer, Space } from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {Link, Routes, Route, useNavigate} from "react-router-dom";
import {BaseUrl} from "../../BaseUrl";
import axios from "axios";
import ReactPaginate from "react-paginate"
import {ToastContainer, toast} from 'react-toastify';
import Base from 'antd/es/typography/Base';
import ChartS from './chartS';
const { Header, Sider, Content, } = Layout;



function SuperAdminMAin(props) {

    const [open, setOpen] = useState(false);
    const [size, setSize] = useState();
    const showDefaultDrawer = () => {
      setSize('default');
      setOpen(true);
    };
    const showLargeDrawer = () => {
      setSize('large');
      setOpen(true);
    };
    const onClose = () => {
      setOpen(false);
    };
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [data, setData] = useState([])
    const [user, setUser] = useState([])
    const [user_id, setUser_Id] = useState([])
    const [dataId, setDataId] = useState("")
    const [modalDataId, setModalDataId] = useState([])
    const [textMenu, setTextMenu] = useState("new")
    // const [status, setStatus] = useState("")
    const [text, setText] = useState(false)

    // console.log(user_id)


   

    useEffect(() => {
        notify();
    }, [text]);

    const notify = () => {
        if (text === ""){} else if(text === "Taklif tasdiqlandi!"){
            toast.success(text);
        }
        else{
            toast.error(text);
        }
        setText("")
    };


    // console.log(dataStatus)

    const logOut = () =>{
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        localStorage.removeItem('username')
        localStorage.removeItem('password')
        navigate("/main_admin_sv_auth")
    }


    const getNewData = () =>{
        axios.get(BaseUrl+"/api/admin/taklifs/"+textMenu+"/"+localStorage.getItem("id"),{
            headers:{
                "Authorization": "Bearer Bearer "+ localStorage.getItem("token")
            }
        }).then(res=>{
            console.log(res.data)
            setData(res.data.taklifs)
            setUser(res.data.users)
        }).catch(err=>{
            console.log(err, "salom")
        })
    }


    const getOneData = (id) =>{
        axios.get(BaseUrl+"/api/admin/taklifs/"+id,{
            headers:{
                "Authorization": "Bearer Bearer "+ localStorage.getItem("token")
            }
        }).then(res=>{
            setDataId(id)
            setModalDataId(res.data.data)
            console.log(res.data.data)
        }).catch(err=>{
            console.log(err)
        })
    }

    console.log(user_id)




    const postStatus = (status) => {
      axios.post(BaseUrl+"/api/admin/taklifs/toChange/"+modalDataId.id,{status},{
          headers:{
              "Authorization": "Bearer Bearer "+ localStorage.getItem("token")
          }
      }).then(res=>{
          console.log(res.status)
          console.log(res)
          if(res.status === 200){
            getNewData()
            setText(res.data.result)
          }
        //   console.log(dataId)
      }).catch(err=>{
          console.log(err)
      })
    }

    const postTask = () =>{
        axios.post(BaseUrl +"/api/admin/taklifs/"+modalDataId.id, {user_id},{
            headers:{
                "Authorization": "Bearer Bearer "+ localStorage.getItem("token")
            }
        }).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    }


    const deleteData = (id) =>{
        axios.delete(BaseUrl+"/api/admin/taklifs/"+id,{
            headers:{
                "Authorization": "Bearer Bearer "+ localStorage.getItem("token")
            }
        }).then(res=>{
            console.log(res)
            if(res.status === 201){
                getNewData()
                console.log(res.data.message)
                setText(res.data.message)
            }
        }).catch(err=>{
            console.log(err)
        })
    }


    useEffect(()=>{
        getNewData()
    },[textMenu])

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 15;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        // console.log(Loading items from ${itemOffset} to ${endOffset});
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, data]);

    const handleCancel = (status) => {
        // setIsModalOpen(false);
        // setStatus(status)
    }
    

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };
    return (
        <>
            <Layout>
            <ToastContainer/>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo_main_page">
                        <img className="img-for-logo" src="https://yt3.ggpht.com/a/AATXAJxvHU_V9ATaE-t_2rnF1-O8Kn6CLe1wAt_--w=s900-c-k-c0xffffffff-no-rj-mo" alt=""/>
                    </div>
                    <Menu className="big_menu" theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item onClick={()=>setTextMenu("new")} className="menu-main-item" key="1">
                            <Link to="/main_admin_sv_main_super/">
                                <div className="in_menu_item">
                                <BarChartOutlined />
                                    <div className="for_menu_text">Statistika</div>
                                </div>
                            </Link>
                        </Menu.Item>
                        <Menu.Item onClick={()=>setTextMenu("new")} className="menu-main-item" key="2">
                            <Link to="/main_admin_sv_main_super/all/data">
                                <div className="in_menu_item">
                                <FileTextOutlined />
                                    <div className="for_menu_text">Yangi arizlar</div>
                                </div>
                            </Link>
                        </Menu.Item>
                        {/* <button><a href="http://127.0.0.1:8000/taklifFile/download/31">swefwef</a></button> */}
                       
                        <Menu.Item onClick={()=>{setTextMenu("fails");setItemOffset(0)}} className="menu-main-item" key="3">
                            
                            <Link to="/main_admin_sv_main_super/all/data">
                                <div className="in_menu_item">
                                <FormOutlined />
                                    <div className="for_menu_text">Ko'rib chiqilganlar</div>
                                </div>
                            </Link>
                            
                        </Menu.Item>
                        <Menu.Item onClick={()=>{setTextMenu("done");setItemOffset(0)}} className="menu-main-item" key="4">
                        <Link to="/main_admin_sv_main_super/all/data">
                        <div className="in_menu_item">
                                <FileDoneOutlined />
                                <div className="for_menu_text">Bajarilgan murojaatlar</div>
                            </div>  
                        </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header style={{padding: "0 30px 0 0", background: "dark", display:"flex", justifyContent:"end", alignItems:"center"}}>
                        
                       <div style={{cursor:"pointer"}} onClick={logOut} className="log_out d-flex align-items-center">
                           <p style={{color:"white", margin:"10px 5px"}}>Chiqish</p>
                           <LogoutOutlined />
                       </div>
                    </Header>
                    <Content style={{margin: '24px 16px', padding: 24, minHeight: "81.5vh", background: colorBgContainer,}}>
                       {
                        <Routes>
                            <Route path="/" element={<ChartS/>}/>
                            <Route path="/all/data" element={<>
                                <table className="table table-hover">
                            <thead>
                            <tr>
                                <th scope="col">TR</th>
                                <th scope="col">Kategoriya</th>
                                <th scope="col">Murojaat mazmuni</th>
                                <th scope="col">Muallif</th>
                                <th scope="col">File</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                               data &&  data.map((item, index)=>(
                                    <tr onClick={()=>{showLargeDrawer(); getOneData(item.id)}} key={index}>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.category}</td>
                                        <td>{item.muammo}</td>
                                        <td>{item.muallif}</td>
                                        <td><p style={{marginLeft:"8px", }}>{item.qushimchaFile ? <a href={BaseUrl+"/storage/"+item.qushimchaFile} target={"_blank"}><button  style={{width:"130px",border:"1px solid green",borderRadius:"10px", outline:"none", color:"green",height:"35px", marginTop:"-10px"}}><CloudDownloadOutlined /> yuklab olish</button></a> : "Qoshimcha file biriktirilmagan"}</p></td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                        <div className="my-pagination">
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel=" >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={2}
                                pageCount={pageCount}
                                previousLabel="<"
                                renderOnZeroPageCount={null}
                                containerClassName="pagination"
                                pageLinkClassName="page-num"
                                previousLinkClassName="page-num"
                                nextLinkClassName="page-num"
                                activeLinkClassName="active"
                            />
                        </div>
                            </>}/>
                        </Routes>
                       }
                    </Content>
                </Layout>
            </Layout>
            
      <Drawer
        title={`To'liq Ma'lumotllar`}
        placement="right"
        size={size}
        onClose={onClose}
        open={open}>
        <div className="d-flex">
                        <h5>Kategoriya: </h5>
                        <p style={{marginLeft:"8px", borderBottom:"1px solid black",fontSize:"18px"}}>{modalDataId.category}</p>
                    </div>
                    <div className="d-flex">
                        <h5>Muammo:</h5>
                        <p style={{marginLeft:"8px", borderBottom:"1px solid black",fontSize:"18px"}}>{modalDataId.muammo}</p>
                    </div>
                    <div className="d-flex">
                        <h5>Kutilayotgan natija:</h5>
                        <p style={{marginLeft:"8px", borderBottom:"1px solid black",fontSize:"18px"}}>{modalDataId.muammoNatija}</p>
                    </div>
                    <div className="d-flex">
                        <h5>Muallif:</h5>
                        <p style={{marginLeft:"8px", borderBottom:"1px solid black",fontSize:"18px"}}>{modalDataId.muallif}</p>
                    </div>
                    <div className="d-flex">
                        <h5>Muallif ma'lumoti:</h5>
                        <p style={{marginLeft:"8px", borderBottom:"1px solid black",fontSize:"18px"}}>{modalDataId.muallifInfo}</p>
                    </div>
                    <div className="d-flex">
                        <h5>File:</h5>
                        <p style={{marginLeft:"8px", fontSize:"18px"}}>{modalDataId.qushimchaFile ? <a href={BaseUrl+"/storage/"+modalDataId.qushimchaFile} target={"_blank"}><button  style={{width:"140px",border:"1px solid green",borderRadius:"10px", outline:"none", color:"green",height:"35px", marginTop:"-10px"}}><CloudDownloadOutlined /> yuklab olish</button></a> : "Qoshimcha file biriktirilmagan"}</p>
                    </div>
                    {
                        modalDataId.status === 0 ? 
                        <>
                        <div className="d-flex" style={{justifyContent:"center"}}>
                        <h5>Murojaatni biriktirish</h5>
                    </div>
                    <div className="d-flex" style={{justifyContent:"space-between", width:"100%"}}>
                        <div  style={{width:"75%"}}>
                            <select onClick={(e)=>setUser_Id(+e.target.value)} style={{boxShadow:"none"}} className="form-select">
                                {
                                    user && user.map((item, index)=>(
                                        <option key={index} value={item.id}>{item.bulim}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div style={{width:"15%"}}><button onClick={()=>{postTask()}} className="btn btn-primary">Biriktirish</button></div>
                        {/* <button className="btn btn-danger" onClick={()=>{ deleteData(modalDataId.id)}}>O'chirish</button> */}
                    </div>
                        </> : modalDataId.status === 1 ? <>
                             <div className="mt-3" style={{width:"100%", display:"flex", justifyContent:"space-between"}}>
                                <button className="btn btn-danger" onClick={()=>{handleCancel(2); deleteData(modalDataId.id);onClose()}}>O'chirish</button>
                                <button className="btn btn-primary" onClick={()=>{handleCancel(2); postStatus(2);onClose()}}>Ko'rib chiqilganlar</button>
                            </div>
                        </>:modalDataId.status === 2 ? 
                        <>
                             <div className="mt-3" style={{width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center",}}>
                                <button className="btn btn-danger" onClick={()=>{handleCancel(2); deleteData(modalDataId.id);onClose()}}>O'chirish</button>
                                <button className="btn btn-success" onClick={()=>{handleCancel(1); postStatus(1);onClose()}}>Bajarilganlar</button>
                            </div>
                        </>
                            :<></>
                        
                    }                    
      </Drawer>
        </>
    );
}

export default SuperAdminMAin;