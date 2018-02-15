import React from 'react';

class Ground extends React.Component{
    constructor(props){
        super(props);
        this.state={
            holder:'',
            exist:[],
            limit:3,
            changed:false
        }
    }

    drop=(arr)=>(e)=>{
        e.preventDefault();
        var pick=arr.indexOf(Number(this.state.holder));
        console.log("pick index : ",pick);
        var drop=arr.indexOf(Number(e.target.innerHTML));
        console.log("drop index: ",drop);
        var val1=arr[pick];
        console.log("pick val: ",val1);
        var val2=arr[drop];
        console.log("drop val : ",val2);
         if(pick>drop){
             arr.splice(drop,0,val1);
             arr.splice(pick+1,1);

             this.setState({
                exist:arr
            })
        }
        if(pick<drop){
            arr.splice(pick,1);
            arr.splice(drop,0,val1);

            this.setState({
                exist:arr
            })
        }
        var win=this.checkWin(arr)();
        if(win)
            alert('Welcome to the team.')
    }

    ndrop=(e)=>{
        e.preventDefault();
    }

    move=(e)=>{
        this.state.holder=Number(e.target.innerHTML);
    }

    checkWin=(arr)=>()=>{
        var l=this.state.limit*this.state.limit;
       for(var i=0;i<l;i++){
           if(!(arr[i]===i+1))
               return false;
       }
        return true;
    }

    changeGround=(e)=>{
        this.setState({
            limit:e.target.selectedOptions[0].value,
            changed:true
        })
    }

    render(){
        var arr=[];
        var l=this.state.limit*this.state.limit;
        var exist=this.state.exist;
        var no;
        var flag;

        {/*GENERATE RANDOM NUMBERS FOR DIVs*/}
        if(exist.length<=0 || this.state.changed==true) {
            exist=[];
            this.state.changed=false;
            for (var i = 0; i < l; i++) {
                flag = true;
                while (flag) {
                    no = Math.floor(Math.random() * l) + 1;
                    if (exist.indexOf(no) === (-1)) {
                        flag = false;
                    }
                }
                exist.push(no);
            }
        }

        var ind=0;
        {/*PUSH RANDOM NUMBERS IN ARRAY*/}
        for (var i = 0; i < this.state.limit; i++) {
            var a = [];
             for (var j = 0; j < this.state.limit; j++) {
                    a.push(exist[ind++]);
            }
            arr.push(a);
        }

        {/*GENERATE DIVs*/}
        var renderGround=arr.map((row,index)=>{
            return (
                <div key={index}>{
                    row.map((col,index) => {
                        return (
                            <div key={index} className={'col'} onDragStart={this.move} onDrop={this.drop(exist)} draggable={'true'} onDragOver={this.ndrop}>
                                {col}
                            </div>
                        )
                    })
                }
                <br/>
                </div>
            )
        })

        {/*RETURN GROUND WITH DROPDOWN*/}
        return(
            <div>
                <div className={'col-sm-2 offset-5 form-group'}>
                    <select className={'form-control'} onChange={this.changeGround}>
                        <option value={2}>2</option>
                        <option value={3} selected={'true'}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                    </select>
                </div>
                <div>
                {renderGround}
                </div>
            </div>
        )
    }
}
export default Ground;