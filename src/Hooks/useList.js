import { useCallback, useEffect, useRef, useState } from "react"
import useRequest from "./useRequest"
import useUser from "./useUser"
import { MdChildCare } from "react-icons/md"


const useList = () => {
    const { api_ } = useRequest()
    const { token } = useUser()
    const alertCount = useRef(0)
    const allListsName = "shoppingLists"

    
    const saveList = useCallback(async(list={}, silent=false) => {
        try {
            await api_(()=>saveToLocalStorage(list)).post('/create-list', list)
            .then(res => {
                if(!silent)alert(res.data.message)
            })
            .catch(({message, response}) => {
                if(response){
                    if(!silent)alert(response.data.message)
                    return
                }
                if(!silent)alert(message)
            }) 
        } catch (error) {
            saveToLocalStorage(list)
        }
    }, [api_])

    const getMyLists = useCallback(() => {
        return new Promise(async(resolve, reject) => {
            await api_().get('/my-lists')
            .then(res => {
                resolve(res.data)
            })
            .catch((message, response ) => {
                console.log('error fetching')
                if(response){
                    alert(response.data.message)
                }else{
                    if(message.message === "Network Error"){
                        if(alertCount.current < 1)alert("You are offline, your lists are not synchronized!")
                    }else{
                        if(alertCount.current < 1)alert(message.message)
                    }
                }
                alertCount.current ++
                // fetch offline list
                resolve(fetchFromLocalStorage())
            })
        })
    }, [api_])



    const synchronize = useCallback(async(silent=false) =>{
        let localList = fetchFromLocalStorage()
        // localStorage.removeItem(allListsName)
        try {
            if(token){ // only for logged in users
                let onlineList = await getMyLists()
                if(onlineList.lenth !== localList.length){
                    localList = [...new Set(onlineList)]
                }
            }
            // update localStorage
            saveToLocalStorage(localList)
            // save on database
            // await saveList(localList, silent)
            console.log("local is: ", localList)
            setLists(p=>(localList))
        } catch (error) {
            console.log('error: ', error)
            setLists(p=>(localList))
        }
    }, [token, getMyLists])
        


    const [lists, setLists] = useState([])

    useEffect(()=>{
        async function sync(){
            console.log('syncing...')
            await synchronize()
        }
        if(lists.length < 1) setTimeout(() => {
            sync()
        }, 5000);
    }, [synchronize, lists])

    function cleanList(list){
        let acc = []
        for(let child of list){
            if(typeof(child) === 'object'){
                if(Array.isArray(child)){
                    let x = child.filter(x => (typeof(x) === 'object') && (!Array.isArray(x)))
                    acc.push(x)
                }
            }
        }
        let y = acc.reduce((acc, count)=>[...acc, ...count])
        let hold = []
        for(let x of y){
            if((typeof(x) === 'object') && (!Array.isArray(x))) hold.push(x)
        }
        //  remove duplicates
        let clean = []
        for(let child of hold){
            if(clean.length > 0){
                let test = ''
                for(let x of clean){
                    console.log("x is: ", x)
                }
                console.log("test script: ", test)
                if(!test.includes(child.title))clean.push(MdChildCare)
            }else{
                clean.push(child)
            }
        }

        return Array.from(clean)
    }

    const saveToLocalStorage = (list={}) => {
        // alert("Saving offline...")
        try {
            let local_List = JSON.parse(localStorage.getItem(allListsName))
            
            // clean localList 
            
            let localList = cleanList(local_List)
            console.log('localList reduced: ', localList)
            let hold = localList.filter(p => p.title === list.title)
            if(hold.length > 0){
                localList[localList.indexOf(hold[0])] = list
            }else{
                localList.push(list)
            }
            // remove repeating elements 
    
            
            // console.log("saving this shit: ", clean)
            // localStorage.setItem("shoppingLists", JSON.stringify(clean))
        } catch (error) {
            localStorage.setItem(allListsName, JSON.stringify(list))
        }
    }

    function fetchFromLocalStorage(){
        let localList = []
        try { 
            localList = JSON.parse(localStorage.getItem(allListsName))
            console.log("look what we have: ", localList[0])
        } catch (error) {
            localList = []
        }
        console.log("local has: ", localList.length)
        if(localList === null ) return []
        return localList
    }

    async function deleteList(list_id) {
        await api_().delete(`/delete-list:${list_id}`)
        .then(res => {
            alert(res.data.message)
            let hold = lists.filter(p => p._id !== list_id)
            setLists(p => (hold))
        })
        .catch(({response, message})=>{
            if(response){
                alert(response.data.message)
                return
            }
            alert(message.message)
        })
    }


    return { lists, synchronize, saveList, getMyLists, deleteList }
}

export default useList
