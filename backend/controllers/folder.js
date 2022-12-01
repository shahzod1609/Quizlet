const Folder = require('../models/folder')
const User = require('../models/auth')
const Module = require('../models/module')
const userModule = require('../models/userModule')
const Card = require('../models/Cards')
const Sequelize = require('sequelize')
const Cards = require('../models/Cards')
const Score = require('../models/score')
const Op = Sequelize.Op
const fs = require('fs')


exports.getFolder = (req, res, next) => {
    const userId = req.header('userId')
    let user;
    User.findOne({ where: { id: userId } })
        .then(result => {
            user = result
            return user
                .getFolders()
        })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err)
        })
}


exports.postFolder = (req, res, next) => {
    const { title, description } = req.body
    const userId = req.header('userId')
    let user
    User.findByPk(userId)
        .then(data => {
            user = data
            return user.createFolder({
                title: title,
                description: description
            })
        })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.json(err.message)
        })
}


exports.getModule = async (req, res, next) => {
    let usermodule
    const userId = await req.header('userId')
    
    try {
        usermodule = await userModule.findAll({
            where: {
                userId: userId
            },
            attributes: ['id'],
            include: [
                {
                    model: Module,
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'name', 'image']
                        }

                    ]
                },
                {
                    model: Card,
                    attributes: ['image', 'learn']
                }
            ]
        })
    } catch (err) {
        next(err)
    }
    if(!usermodule)
        next(err)
    let results = []
    for (let i = 0; i < usermodule.length; i++) {
        let max, Learn = [], index, fullLearn = 0, partLearn = 0, notLearn = 0
        for (let j = 0; j < usermodule[i].cards.length; j++) {
            if (usermodule[i].cards[j].learn === 2)
                await fullLearn++;
            else if (usermodule[i].cards[j].learn === 1 || usermodule[i].cards[j].learn === 0)
                await partLearn++;
            else
                await notLearn++;
        }

        Learn[0] = await Math.floor((fullLearn * 100) / usermodule[i].cards.length)
        max = Learn[0]
        Learn[1] = await Math.floor((partLearn * 100) / usermodule[i].cards.length)
        Learn[2] = await Math.floor((notLearn * 100) / usermodule[i].cards.length)
        for (let j = 0; j < 3; j++) {
            if (max < Learn[j]) {
                max = Learn[j]
                index = j
            }
        }
        while (Learn[0] <= 5 && Learn[0] !== 0) { Learn[0]++; Learn[index]--; }
        while (Learn[1] <= 5 && Learn[1] !== 0) { Learn[1]++; Learn[index]--; }
        while (Learn[2] <= 5 && Learn[2] !== 0) { Learn[2]++; Learn[index]--; }
        results.push({ fullLearn: Learn[0], partLearn: Learn[1], notLearn: Learn[2] })
    }
    res.json({ usermodule: usermodule, results: results })

}

exports.postModule = async (req, res, next) => {
    const folderId = req.query.folderid || null
    const userId = req.header('userId')
    const moduleDataTitle = req.body.moduleTitle;
    const moduleDataDescription = req.body.moduleDescription
    const allTerm = req.body.term
    const allDefinition = req.body.definiton
    const allImageName = req.body.imagePath

    //localhost:8080/admin/cards
    let module1, card, user, usermodel, folder;
    let cards = []

    for (let i = 0; i < allTerm.length; i++) {
        let imagePath = null
        for (let j = 0; j < req.files.length; j++) {
            if (req.files[j].originalname === allImageName[i]) {
                imagePath = req.files[j].path
            }
        }

        cards.push({
            term: allTerm[i],
            definition: allDefinition[i],
            image: imagePath
        })
    }

    User.findByPk(userId)
        .then(result => {
            user = result
            return user.createModule({
                title: moduleDataTitle,
                description: moduleDataDescription,
                totalCards: allTerm.length
            })
        })
        .then(data => {
            module1 = data
            return module1.createUsermodule({ userId: userId, folderId: folderId })
        })
        .then(data => {
            usermodel = data
            return Card
                .bulkCreate(cards)

            // ? ? ? ? 
        })
        .then(result => {
            card = result
            return usermodel.addCard(card)
        })
        .then(result => {

            if (folderId !== null)
                return Folder.findOne({ where: { id: folderId } })
            else
                return
        })
        .then(result => {
            if (result)
                return result.update({ totalModule: result.totalModule + 1 })
            else
                return
        })
        .then(() => {
            res.json({ module: module1, card: card })
        })
        .catch(err => {
            console.log(err)
            res.json(err.message)
        })
}

exports.getCards = async (req, res, next) => {
    const moduleId = await req.params.moduleid
    const searchBool = await req.header('search') || false
    const userId = await req.header('userId')
    const test = await req.header('test')
    let data, dataNew, dataBool

    if (searchBool === 'false' || searchBool === false) {
        dataBool = {
            moduleId: moduleId,
            userId: userId
        }
    } else {
        dataBool = {
            moduleId: moduleId
        }
    }

    try {
        data = await userModule
            .findOne({
                where: dataBool,
                include: [
                    {
                        model: Module,
                        include: [
                            {
                                model: User,
                                attributes: ['id', 'name', 'email', 'image']
                            }
                        ]
                    },
                    {
                        model: Cards
                    }
                ]
            })
        if (!data)
            return res.json({ success: false })
        dataNew = data.toJSON()
        let cards = {}, lastOne = false
        if (data)
            cards = await data.cards

        if (test) {
            let stuk = 0, restart;
            restart = false
            for (let i = 0; i < cards.length; i++)
                if (cards[i].learn === 0 || cards[i].learn === null) {
                    stuk = 1;
                }
            if (stuk === 0) {
                restart = true
            }
            stuk = 0;
            if (restart) {
                for (let i = 0; i < cards.length; i++)
                    await cards[i].update({ learn: null })
            }
            let dataCards = [], i
            for (i = 0; i < cards.length; i++) {
                // console.log(cards[i])
                if (cards[i].learn < 2 || cards[i].learn === null) {
                    stuk++;
                    dataCards.push(cards[i])
                }
                if (stuk === 5)
                    break
            }
            
            if (i === cards.length - 1)
                lastOne = true
            if (dataCards.length < 4) {
                for (let i = 0; i < cards.length; i++) {
                    if (cards[i].learn !== null)
                        dataCards.push(cards[i])
                    if (dataCards.length > 3)
                        break
                }
                lastOne = true
            } else if (cards.length <= 5)
                lastOne = true

            dataNew.cards = await dataCards
        }
        if (test)
            return res.json({ data: dataNew, lastOne: lastOne })
        else
            return res.json(dataNew)
    } catch (err) {
        console.log(err)
    }


}


//PUT card
exports.putCard = (req, res, next) => {


}


//PUT module and cards
exports.putModule = async (req, res, next) => {
    let oldCard
    const moduleid = req.params.moduleid

    const allTerm = req.body.term
    const allDef = req.body.definiton
    const allImagePath = req.body.imagePath
    const moduleData = {
        title: req.body.moduleTitle,
        description: req.body.moduleDescription,
        totalCards: allTerm.length
    }
    const cardData = []

    for (let i = 0; i < allTerm.length; i++) {
        let imagePath = allImagePath[i]
        for (let j = 0; j < req.files.length; j++) {
            if (req.files[j].originalname === allImagePath[i])
                imagePath = await req.files[j].path
        }
        if (imagePath === 'null')
            imagePath = await null

        // if(imagePath === 'undefined')imagePath = null
        cardData.push({
            term: allTerm[i],
            definition: allDef[i],
            image: imagePath,
            learn: null
        })
    }

    try {
        usermodule = await userModule.findOne(
            {
                where: { moduleId: moduleid },
                include: [
                    {
                        model: Card
                    },
                    {
                        model: Module
                    }
                ]
            }
        )
        await usermodule.module.update(moduleData)
        let cards = usermodule.cards
        oldCard = [...cards]

        let minLength = cards.length
        if (minLength > cardData.length)
            minLength = cardData.length

        for (let i = 0; i < minLength; i++) {
            if (cards[i].image !== cardData[i].image && cards[i].image) {
                await deleteFile(cards[i].image)
            }

            await cards[i].update(cardData[i])
        }
        if (cards.length > cardData.length) {
            for (let i = cardData.length; i < cards.length; i++) {

                if (cards[i].image)
                    await deleteFile(cards[i].image)
                await cards[i].destroy()
            }
        }
        if (cards.length < cardData.length) {
            for (let i = cards.length; i < cardData.length; i++) {
                await usermodule.createCard(cardData[i])
            }
        }


        res.json({ message: 'upated' })

    } catch (err) {
        console.log(err)
    }
}

exports.postFolMod = (req, res, next) => {
    const modulee = req.body.module
    const id = req.params.folderid
    const userId = req.header('userId')
    const newModuleId = modulee.map(e => e.id)
    let usermodule
    userModule
        .findAll({
            where: {
                [Op.and]: {
                    moduleId: {
                        [Op.in]: newModuleId
                    },
                    userId: userId
                }
            }
        })
        .then(result => {
            usermodule = result
            return Folder.findByPk(id)
        })
        .then(data => {
            folder = data
            return folder.addUsermodules(usermodule)
        })
        .then(data => {
            return folder.update({
                totalModule: folder.totalModule + modulee.length
            })
        })
        .then((data) => {
            res.json({ message: 'Successfully module add folder' })
        })
        .catch(err => {
            res.json({ message: 'OOPs somewhere false' })
            console.log(err)
        })
}

exports.getFolderModules = (req, res, next) => {
    const folderId = req.params.folderid
    const userId = req.header('userId')
    let folder, user, allModule, folderModule
    User.findOne({
        where: { id: userId },
        attributes: ['id', 'email', 'name'],
        include: [
            {
                model: userModule,
                where: {
                    folderId: folderId
                },
                include: [
                    {
                        model: Module
                    }
                ],
            }
        ]
    })
        .then(result => {
            folderModule = result
            return User.findOne({
                where: { id: userId },
                attributes: ['id', 'email', 'name'],
                include: [
                    {
                        model: userModule,
                        where: {
                            folderId: null
                        },
                        include: [
                            {
                                model: Module
                            }
                        ]
                    }

                ]
            })
        })
        .then(result => {
            allModule = result
            return Folder
                .findOne({ where: { id: folderId } })
        })
        .then(folder => {
            res.json({
                folder: folder,
                foldermodule: folderModule,
                allmodule: allModule
            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.search = (req, res, next) => {
    const modulee = req.query.module
    const userId = req.header('userId')
    let oldResult, searchModuleDat, userModuleData, userData, searchData
    Module
        .findAll({
            where: {
                title: {
                    [Op.and]: {
                        [Op.like]: `%${modulee}%`,
                    }
                }
            }
        })
        .then(result => {
            const data = result
            oldResult = result
            let userIdData = [], moduleIdData = []
            for (let i = 0; i < data.length; i++) {

                if (data[i].userId !== userId) {
                    userIdData.push(data[i].userId)
                    moduleIdData.push(data[i].id)
                }
            }

            return userModule
                .findAll({
                    where: {
                        userId: userIdData,
                        moduleId: moduleIdData
                    },
                    include: [
                        {
                            model: Module,
                            include: [
                                {
                                    model: User,
                                    attributes: ['name', 'email', 'image']
                                }
                            ]
                        }
                    ]
                })
        })
        .then(result => {
            let newData = []
            searchData = result
            for (let index = 0; index < searchData.length; index++) {
                const element = searchData[index];
                if (element.userId === element.module.userId)
                    newData.push(element)
            }
            searchData = newData

            return userModule
                .findAll({
                    where: {
                        userId: userId
                    },
                    attributes: ['moduleId']
                })

        })
        .then(result => {
            userData = result
            res.json({ userData: userData, searchData: searchData })
        })

        .catch(err => {
            console.log(err)
        })

}

exports.postTest = (req, res, next) => {
    const cardId = req.params.cardid
    const answer = req.body.answer


    let answerBool = false
    Card
        .findByPk(cardId)
        .then(result => {
            let step = null
            let string1 = result.definition.trim().toLowerCase()
            let string2 = answer.trim().toLowerCase()
            if ((result.learn === null || result.learn === 0) && string1 === string2) {
                step = 1
                answerBool = true
            }
            else if (string1 === string2 && (result.learn === 1)) {
                step = 2
                answerBool = true
            }
            else if (result.learn === 1) {
                const arrayOfTurkmenHarp = ['ž', 'ä', 'ň', 'ö', 'ş', 'ü', 'ç', 'ý']
                const arrayOfEnglish = ['z', 'a', 'n', 'o', 's', 'u', 'c', 'y']
                // let stuk=0, arrayGarashyk = []
                let bool = true
                for (let i = 0; i < string1.length; i++) {
                    let dogry = false
                    if (string1[i] !== string2[i]) {
                        for (let j = 0; j < arrayOfEnglish.length; j++) {
                            // if(string2[i]==='h'){
                            //     if(string2[i-1]==='c')
                            //         arrayGarashyk[stuk++]='ch'
                            //     if(string2[i-1]==='s')
                            //         arrayGarashyk[stuk++]='sh'
                            // }
                            if ((string2[i] === arrayOfEnglish[j] && arrayOfTurkmenHarp[j] === string1[i]) ||
                                (string2[i] === arrayOfTurkmenHarp[j] && arrayOfEnglish[j] === string1[i])
                            ) {
                                dogry = true
                                break
                            }
                        }

                    } else dogry = true
                    if (!dogry) {
                        bool = false
                        break
                    }
                }
                if (bool) {
                    step = 2
                    answerBool = true
                }
            } else if (result.learn === null || result.learn === 0) {
                step = 0
            }

            if (result.learn !== step)
                return result.update({
                    learn: step
                })
            else
                return
        })

        .then(result => {
            res.json({ success: answerBool })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postAddModuleId = async (req, res, next) => {
    const moduleId = req.params.moduleid
    const userId = req.header('userId')
    let user, moduleOld, usermodule, cards, module1, cardData;
    let moduleData
    try {
        data = await userModule.findOne({
            where: {
                moduleId: moduleId,
                userId: userId
            }
        })
        if (data)
            return res.json({ success: true })
        user = await User.findByPk(userId)
        cards = await userModule.findOne({
            attributes: ['id'],
            where: {
                moduleId: moduleId
            },
            include: [
                {
                    model: Module,
                },
                {
                    model: Cards
                }
            ]
        })
        moduleData = await cards.module
        cards = await cards.cards
        usermodule = await moduleData.createUsermodule({ userId: userId })
        let setData = []
        for (let i = 0; i < cards.length; i++) {
            setData.push({
                term: cards[i].term,
                definition: cards[i].definition,
                image: cards[i].image
            })

        }
        cardData = await Card.bulkCreate(setData)
        let result = await usermodule.addCard(cardData)
        res.json({ success: true })

    } catch (err) {
        console.log(err)
    }
}

exports.getQuizCards = async (req, res, next) => {
    const moduleId = await req.params.moduleid
    const userId = await req.header('userId')

    let data
    try {
        data = await userModule
            .findOne({
                where: {
                    moduleId: moduleId,
                    userId: userId
                },
                include: [
                    {
                        model: Module,
                        include: [
                            {
                                model: User,
                                attributes: ['id', 'name', 'email', 'image']
                            }
                        ]
                    },
                    {
                        model: Cards,
                        attributes: ['id', 'term', 'definition', 'image', 'learn']
                    }
                ]

            })
    } catch (err) {
        console.log(err)
    }

    data = await data.toJSON()

    let goLen = data.test, finLen = data.test + 20, dataCard = [];
    if (finLen > data.cards.length) {
        finLen = data.cards.length
    }
    if (goLen === data.cards.length) {
        goLen = data.cards.length - 20;
        finLen = data.cards.length
    }

    for (let i = goLen; i < finLen; i++) {
        await dataCard.push(data.cards[i])
    }

    let test1 = [], test2 = [], test3 = [], test4 = [], lengthTests = [], randomNumbers = [];
    for (let i = 0; i < 4; i++) {
        lengthTests[i] = await Math.floor(dataCard.length / 4);
    }
    lengthTests[4] = dataCard.length % 4;
    if (lengthTests[2] === 1) {
        lengthTests[3]++
        lengthTests[2]--;
    }
    if (lengthTests[1] === 1) {
        lengthTests[0]++;
        lengthTests[1]--;
    }
    if (lengthTests[4] !== 0) {
        lengthTests[2] += lengthTests[4]
        lengthTests[4] = null
    }

    for (let i = 0; i < dataCard.length; i++) {
        let ranNum;
        while (true) {
            ranNum = await Math.floor(Math.random() * dataCard.length);

            let isValid = true
            for (let j = 0; j < i; j++)
                if (ranNum === randomNumbers[j])
                    isValid = false
            if (isValid)
                break;
        }
        randomNumbers[i] = ranNum;
    }
    //lengthTest;
    //randomNum;

    let start = 0
    for (let i = 0; i < 4; i++) {
        let arrayCard = []

        for (let j = start; j < randomNumbers.length; j++) {
            if (arrayCard.length >= lengthTests[i]) {
                start = j;
                break;
            }
            await arrayCard.push(dataCard[randomNumbers[j]])

        }

        if (i === 0)
            test1 = arrayCard
        else if (i === 1)
            test2 = arrayCard
        else if (i === 2)
            test3 = arrayCard
        else if (i === 3)
            test4 = arrayCard
    }
    // test1 true or false
    let ranAnsDat = await Math.floor(Math.random() * test1.length), hv = 0, defDat = [], indexDef = [], rat = 0;
    for (let i = 0; i < test1.length; i++) {
        let newDef, answer = await Math.floor(Math.random() * 2);
        if (answer === 1) {
            newDef = await dataCard[Math.floor(Math.random() * dataCard.length)].definition
            if (newDef !== test1[i].definition) {
                defDat[rat] = await test1[i].definition
                indexDef[rat] = i;
                rat++
            }
            test1[i].definition = await newDef
        } else
            hv++;

    }
    while (test1.length / 2 > hv) {
        rat--;
        test1[indexDef[rat]].definition = await defDat[rat]
        hv++;
    }
    //test2 a,b,c,d-?
    let dataArray = []
    for (let i = 0; i < test2.length; i++) {
        let locAns, questionArray = [];
        locAns = await Math.floor(Math.random() * 4)
        questionArray[0] = await Math.floor(Math.random() * dataCard.length)
        while (dataCard[questionArray[0]].id === test2[i].id) {
            questionArray[0] = await Math.floor(Math.random() * dataCard.length)
        }
        questionArray[1] = questionArray[0]
        questionArray[2] = questionArray[1]
        while (questionArray[0] === questionArray[1] || dataCard[questionArray[1]].id === test2[i].id) {
            questionArray[1] = await Math.floor(Math.random() * dataCard.length)
        }
        while (questionArray[2] === questionArray[1] || questionArray[2] === questionArray[0] || dataCard[questionArray[2]].id === test2[i].id) {
            questionArray[2] = await Math.floor(Math.random() * dataCard.length)
        }
        let questionData = [], number = 0
        questionData[locAns] = test2[i].definition
        for (let j = 0; j < 4; j++) {
            if (!questionData[j]) {
                const u = dataCard[questionArray[number]].definition
                questionData[j] = u
                number++;
            }
        }

        dataArray[i] = questionData
    }
    for (let i = 0; i < test2.length; i++) {
        test2[i].definition = dataArray[i]
    }

    //test3 choose

    let dataDef = [], ranNumbers = [], ranMuk = 0
    for (let z = 0; z < test3.length; z++)
        dataDef[z] = test3[z].term

    for (let i = 0; i < test3.length; i++) {
        let isValid, ranNum
        while (true) {
            ranNum = await Math.floor(Math.random() * test3.length);
            isValid = false;
            for (let z = 0; z < ranMuk; z++)
                if (ranNum === ranNumbers[z])
                    isValid = true

            if (!isValid) {
                ranNumbers[ranMuk] = ranNum
                ranMuk++;
                break
            }
        }
        test3[i].term = dataDef[ranNum];
    }

    //test4 write
    for (let i = 0; i < test4.length; i++)
        test4[i].definition = "";
    ///----
    data.cards = [
        {
            test1: test1,
            test2: test2,
            test3: test3,
            test4: test4
        },
    ]
    res.json(data)
}

exports.postQuizResult = async (req, res, next) => {
    const moduleId = await req.params.moduleid
    const userId = await req.header('userId')
    const { testFirst, testSecond, testThird, testFour } = req.body[0];

    let data, cloudData, finLen
    try {
        cloudData = await userModule.findOne({
            where: {
                userId: userId,
                moduleId: moduleId
            },
            attributes: ['test'],
            include: [
                {
                    model: Cards,

                },
                {
                    model: Module
                }
            ]
        })
        data = await cloudData.toJSON()
        finLen = await data.test + 20
        if (finLen >= data.cards.length)
            finLen = 0
        const dataUpdate = await userModule.update(
            { test: finLen },
            { where: { userId: userId, moduleId: moduleId } }
        )
    } catch (err) {
        console.log(err)
    }

    // console.log(data)

    //test1_Answers
    let answerDatas =
    {
        test1: [],
        test2: [],
        test3: [],
        test4: []
    }, dataCard, asnwerTest, answerData
    for (let i = 0; i < testFirst.length; i++) {
        asnwerTest = false
        answerData = false
        let answer = testFirst[i].boolAnswer
        dataCard = await findElement(data.cards, testFirst[i].id)
        if (testFirst[i].definition === dataCard.definition) {
            asnwerTest = true
        }
        if (asnwerTest === testFirst[i].boolAnswer) {
            answerData = true
        } else if (testFirst[i].boolAnswer === null) {
            answerData = 'omitted'
            answer = asnwerTest
        }
        let def = dataCard.definition
        if (asnwerTest)
            def = ''

        answerDatas.test1.push({
            id: dataCard.id,
            trueAnswer: answer,
            messageBool: answerData,
            trueDef: def
        })
    }

    //test2_Answers
    for (let i = 0; i < testSecond.length; i++) {
        dataCard = await findElement(data.cards, testSecond[i].id)

        answerData = false
        if (dataCard.term === testSecond[i].term)
            answerData = true
        let bool = answerData
        if (testSecond[i].term === '')
            bool = 'omitted'
        answerDatas.test2.push({
            id: dataCard.id,
            messageBool: bool,
            trueAnswer: answerData,
            trueTerm: dataCard.term
        })
    }

    //test3_Answer
    for (let i = 0; i < testThird.length; i++) {
        dataCard = await findElement(data.cards, testThird[i].id)
        const e = testThird[i]
        answerData = false
        if (dataCard.definition === e.definition[e.answer]) {
            answerData = true
        }
        if (e.answer === null) {
            answerData = 'omitted'
        }

        answerDatas.test3.push({
            id: dataCard.id,
            trueAnswer: answerData,
            trueDef: dataCard.definition
        })
    }

    for (let i = 0; i < testFour.length; i++) {
        dataCard = await findElement(data.cards, testFour[i].id)
        answerData = false
        if (dataCard.definition.trim().toUpperCase() === testFour[i].definition.trim().toUpperCase()) {
            answerData = true
        }
        let bool = answerData
        if (testFour[i].definition === '') {
            bool = 'omitted'
        }
        answerDatas.test4.push({
            id: dataCard.id,
            trueAnswer: answerData,
            messageBool: bool,
            trueDef: dataCard.definition
        })
    }

    res.json({ success: true, data: answerDatas })

}



//-=--------------------------------

const findElement = (data, id) => {
    return data.find((e) => {
        return e.id === id
    })
}

const deleteFile = async (url) => {
    await fs.unlink(url, (err) => {
        if (err)
            throw err
    })
}


