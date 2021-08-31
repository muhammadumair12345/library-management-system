	var booksRecordArray=[];
	var updationRecord={};
		function addBooksRecord() {
			if(localStorage.getItem("BooksRecord"))
			{
				booksRecordArray=getBooksRecordFromLocalstorage();
			}
		 	const number=0;
			const bookName=document.getElementById("bookName").value;
			const authorName=document.getElementById("authorName").value;
			const publisherName=document.getElementById("publisherName").value;
			const date=document.getElementById("date").value;
			const button='<div><input type="button" value="X" onclick="deleteBooksRecord(this)"><input type="button" value="Update" onclick="updateBooksRecord(this)"></div>';
			const record={"number":number,"bookName":bookName,"authorName":authorName,"publisherName":publisherName,"date":date,"button":button};
			let validationFlag=inputValidation(record);
			if(validationFlag)
			{
			let dublicateFlag=checkDublicateRecord(record);
			if(!dublicateFlag)
			{
			booksRecordArray.push(record);
			setBooksRecordToLocalstorage();
			location.href="../index.html";
			}
			else{
				alert("This data is already exist!");
			}
			}
			else
			{
				alert("Please fill your empty fields!");
			}
		 }

		 function setBooksRecordToTable(){
		 	booksRecordArray=getBooksRecordFromLocalstorage();
		 	let table=document.getElementById("mytable");
		 	if(booksRecordArray!==null)
		 	{
		 	booksRecordArray.map((record,index)=>{
				let cellIncrement=0;
				let addRow=table.insertRow(-1);
				record["number"]=index+1
				for(let property in record)
				{
					let addCol=addRow.insertCell(cellIncrement++);
					addCol.innerHTML=record[property];
				}
			});
			setBooksRecordToLocalstorage();
		 	}	
		 }

		 function setDetailToTable(property){
		 	let recordArray=[];
			booksRecordArray=getBooksRecordFromLocalstorage();
			const deleteBtn='<input type="button" value="X" id="btn" onclick="deleteDetailRecord(this)">';
			for(let i=0;i<booksRecordArray.length;i++)
			{
			let name=booksRecordArray[i][property];
			let numOfBooks=1;
			for(let j=i+1;j<booksRecordArray.length;j++)
			{
				if(name===booksRecordArray[j][property])
				{
					numOfBooks++;
					booksRecordArray[j]="";
				}
			}
			if(booksRecordArray[i]!=="")
			{
			const record={"name":name,"numOfBooks":numOfBooks,"deleteBtn":deleteBtn};
			recordArray.push(record);
			}
			}
			let table=document.getElementById("mytable");
		 	recordArray.map((record)=>{
				let cellIncrement=0;
				let addRow=table.insertRow(-1);
				for(let prop in record)
				{
					let addCol=addRow.insertCell(cellIncrement++);
					addCol.innerHTML=record[prop];
				}
			});
		 	}	

 		function setBooksRecordToLocalstorage(){
		 	localStorage.setItem("BooksRecord",JSON.stringify(booksRecordArray));
		 }

		 function getBooksRecordFromLocalstorage(){
		 	var storageArray=JSON.parse(localStorage.getItem("BooksRecord"));
		 	return storageArray;
		 } 

		 function inputValidation(dataVal){
		 	if(dataVal["bookName"]==""||dataVal["authorName"]==""||dataVal["publisherName"]==""||dataVal["date"]=="")
		 	{
		 		return false;
		 	}
		 	else
		 	{
		 		return true;
		 	}
		}

		function checkDublicateRecord(dataVal){
			var flag=false;
			for(let i=0;i<booksRecordArray.length&&flag==false;i++)
			{
			if(dataVal["bookName"]===booksRecordArray[i]["bookName"]&&dataVal["authorName"]===booksRecordArray[i]["authorName"]&&dataVal["publisherName"]===booksRecordArray[i]["publisherName"]&&dataVal["date"]===booksRecordArray[i]["date"])
			{
				flag=true;
			}
			}
			return flag;
		}

		function deleteBooksRecord(deleteBtn){
			let index=deleteBtn.parentNode.parentNode.parentNode.rowIndex;
			booksRecordArray=getBooksRecordFromLocalstorage();
			booksRecordArray.splice(index-1,1);
			document.getElementById("mytable").deleteRow(index);
			setBooksRecordToLocalstorage();
		}

		function deleteDetailRecord(deleteBtn){
			let row=deleteBtn.parentNode.parentNode;
			let index=deleteBtn.parentNode.parentNode.rowIndex;
			let cellValue=row.children[0].innerHTML;
			booksRecordArray=getBooksRecordFromLocalstorage();
			let booksRecord=booksRecordArray.filter((record)=>cellValue!==record["authorName"]&&cellValue!==record["publisherName"]);
			booksRecordArray=booksRecord;
			document.getElementById("mytable").deleteRow(index);
			setBooksRecordToLocalstorage();
		}

		function updateBooksRecord(updateBtn){
			location.href="Update Books/Update Book.html";
			let index=updateBtn.parentNode.parentNode.parentNode.rowIndex;
			booksRecordArray=getBooksRecordFromLocalstorage();
			updationRecord=booksRecordArray[index-1];
			localStorage.setItem('Update Record',JSON.stringify(updationRecord));
		}
		function addTableDataToForm(){
			updationRecord=JSON.parse(localStorage.getItem("Update Record"));
			document.getElementById("bookName").value=updationRecord["bookName"];
			document.getElementById("authorName").value=updationRecord["authorName"];
			document.getElementById("publisherName").value=updationRecord["publisherName"];
			document.getElementById("date").value=updationRecord["date"];
		}
		function setUpdateDataToTable(){
			updationRecord=JSON.parse(localStorage.getItem("Update Record"));
			updationRecord["bookName"]=document.getElementById("bookName").value;
			updationRecord["authorName"]=document.getElementById("authorName").value;
			updationRecord["publisherName"]=document.getElementById("publisherName").value;
			updationRecord["date"]=document.getElementById("date").value;
			let index=updationRecord["number"];
			booksRecordArray=getBooksRecordFromLocalstorage();
			let validationFlag=inputValidation(updationRecord);
			if(validationFlag)
			{
			let dublicateFlag=checkDublicateRecord(updationRecord);
			if(!dublicateFlag)
			{
				booksRecordArray[index-1]=updationRecord;
				localStorage.removeItem("Update Record");
				setBooksRecordToLocalstorage();
				location.href="../index.html";
			}
			else
			{
				alert("This data is already exist!");
			}
			}
			else
			{
				alert("Please fill your empty fields!");
			}
		}