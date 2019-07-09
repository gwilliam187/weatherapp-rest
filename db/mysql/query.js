import db from './db'


export const getEmployees = (conn, limit)=>{
	return new Promise((resolve, reject)=>{
		let query = `SELECT  de.emp_no, e.first_name, e.last_name, e.hire_date, t.title, d.dept_name, e.birth_date, e.gender FROM employees e INNER JOIN titles t ON e.emp_no = t.emp_no INNER JOIN dept_emp de ON e.emp_no = de.emp_no INNER JOIN departments d ON de.dept_no = d.dept_no WHERE t.to_date = '9999-01-01' AND de.to_date = '9999-01-01'`

		if (typeof limit !== "undefined"){
			query += "LIMIT "+limit
		}

		//console.log(query)
		conn.query(query, (err, res, fields)=>{
			//console.log("---")
			if (!err) {
				let data = []
				for (let i = 0; i < res.length; i++) {
					data.push({
						emp_no: res[i].emp_no,
						first_name: res[i].first_name,
						last_name: res[i].last_name,
						title: res[i].title,
						hire_date: res[i].hire_date,
						dept_name: res[i].dept_name,
						birth_date: res[i].birth_date,
						gender: res[i].gender
					})
				}
				resolve(data)
			}else{
				reject(err)
			}
		})
	})
}

export const insertEmployee = (conn, emp_no, first_name, last_name, birth_date, gender, title, hire_date, dept_name)=>{
	return new Promise(async(resolve, reject) => {
		const dept_no = await insertDepartmentIfNotExist(conn, dept_name)

		const query = "BEGIN; " +
			`INSERT INTO employees (emp_no, birth_date, first_name, last_name, gender, hire_date) VALUES(${emp_no}, "${birth_date}", "${first_name}", "${last_name}", "${gender}", "${hire_date}"); ` +
			`INSERT INTO dept_emp(emp_no, dept_no, from_date, to_date) VALUES(${emp_no}, "${dept_no}", "${hire_date}", "9999-01-01"); ` +
			`INSERT INTO titles(emp_no, title, from_date, to_date) VALUES(${emp_no}, "${dept_no}", "${hire_date}", "9999-01-01"); ` +
			"COMMIT;"

		conn.query(query, (err, res)=>{
			if (err){
				console.error(err)
				resolve(false)
			} else{
				resolve(true)
			}
		})
	})
}

export const deleteEmployee = (conn, emp_no)=>{
	return new Promise(resolve=>{
		const query = "DELETE FROM employees WHERE emp_no = "+emp_no
		conn.query(query, (err, res)=>{
			if (err){
				reject(err)
			} else{
				resolve(true)
			}
		})
	})
}

export const updateEmployee = (conn, emp_no, first_name, last_name, birth_date, gender, title, hire_date, dept_name)=>{
	return new Promise(async (resolve, reject)=>{
		if (await isDepartmentChanged(conn, emp_no, dept_name)===true) {
			const dept_no = await insertDepartmentIfNotExist(conn, dept_name)
			Date.prototype.yyyymmdd = function() {
				var mm = this.getMonth() + 1; // getMonth() is zero-based
				var dd = this.getDate();

				return [this.getFullYear(),
					(mm>9 ? '' : '0') + mm,
					(dd>9 ? '' : '0') + dd
				].join('');
			};

			const dateNow = new Date().yyyymmdd();
			const query = `UPDATE employees SET 
					first_name = "${first_name}", 
					last_name="${last_name}",
					birth_date="${birth_date}",
					gender="${gender}",
					hire_date="${hire_date}" WHERE emp_no = ${emp_no};
					UPDATE dept_emp SET 
					dept_no='${dept_no}',
					from_date='${dateNow}',
					to_date='9999-01-01' WHERE emp_no = ${emp_no}`
			console.log(query)
			conn.query(query, (err, res)=>{
				if (!err){
					resolve(true)
				} else{
					reject(err)
				}
			})

		}else{
			const query = `UPDATE employees SET 
					first_name = "${first_name}", 
					last_name="${last_name}",
					birth_date="${birth_date}",
					gender="${gender}",
					hire_date="${hire_date}" WHERE emp_no = ${emp_no};`
			conn.query(query, (err, res)=>{
				if (!err){
					resolve(true)
				} else{
					reject(err)
				}
			})
		}
	})
}

const insertDepartmentIfNotExist = (conn, dept_name)=>{
	return new Promise(async(resolve, reject)=>{
		if (await checkIfDepartmentExist(conn, dept_name)){
			conn.query(`SELECT dept_no FROM departments WHERE dept_name = "${dept_name}"`, (err, res)=>{
				if (err){
					reject(err)
				}else {
					resolve(res[0].dept_no)
				}
			})
		}else{
			const newId = await getNewDepartmentId(conn)
			conn.query(`INSERT INTO departments (dept_no, dept_name) VALUES("${newId}" ,"${dept_name}")`, (err, res)=>{
				if (err){
					reject(err)
				} else{
					resolve(newId)
				}
			})
		}
	})
}

const checkIfDepartmentExist = (conn, dept_name)=>{
	return new Promise((resolve, reject)=>{
		conn.query("SELECT 'x' FROM departments WHERE dept_name = '"+dept_name+"'", (err, res)=>{
			if (err){
				reject(err)
			} else{
				if (res.length===0){
					resolve(false)
				} else{
					resolve(true)
				}
			}
		})
	})
}

const getNewDepartmentId = (conn)=>{
	return new Promise((resolve, reject)=>{

		conn.query("SELECT MAX(dept_no) AS dept_no FROM departments", (err, res)=>{
			if (err){
				reject(err)
			} else{
				if (res.length===0){
					resolve('d001')
				} else {
					let currId = res[0].dept_no
					currId = currId.replace('d', '')
					currId++
					currId = new String(currId)
					switch (currId.length){
						case 1: currId = 'd00'+currId; break;
						case 2: currId = 'd0'+currId; break;
						default: currId = 'd0'+currId;
					}
					resolve(currId)
				}
			}
		})
	})
}

const isDepartmentChanged = (conn, emp_no, checkDeptName)=>{
	return new Promise(resolve=>{
		const query = `SELECT d.dept_name FROM departments d INNER JOIN dept_emp de ON d.dept_no = de.dept_no WHERE de.emp_no=${emp_no}`
		conn.query(query, (err, res)=>{
			if (!err){
				const oldDept = res[0].dept_name
				if (oldDept===checkDeptName){
					console.log(oldDept+" with "+checkDeptName)
					resolve(false)
				} else{
					resolve(true)
				}
			}
		})
	})
}