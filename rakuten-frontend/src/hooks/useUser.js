import React, {useEffect, useState } from 'react'

import loginForSignup from '../api/login'
import getAnimal from '../api/getAnimal' 
import postHuman,{postAnimal,postPost}  from '../api/postUserAPI'

import { useHistory } from 'react-router-dom'

const initialState = {
    name: null, 
    age: null,
}
const HumanState = {
    //TODO make user_id box
    user_id: null,
    mail: null,
    password: null,
}
const AnimalState = {
    name: null, 
    type: null,
    birthday: null,
    sex: 0,
    residence: null,
    // email: null,
    // password: null,
    image:null,
    profile:null,
}
const TestAnimal = {
    user_id: 'testUser6',
    name: 'nana', 
    type: 'dog',
    birthday: '2000-01-02',
    sex: 0,
    residence: 'Saitama',
    mail: 'ddddddgsdgsdg@fdads.com',
    // password: null,
    image: 'data:image/gif;base64,R0lGODlhAAJ5APcAAAAAAOTm5HV3dK8ACVxdVzs8Nbi5tpaWk////9DRzmRlX6ippoaGg/Hx8FVYUcbGxmxtZ9vb26ChnlBRSmBhWouNifX19a+wru7u7X5+fMC/vscACnBvbN3e3ZmZmUpMRczMzGhpY4+RjVRVT9TV03p8d/n6+FdYVOfp6PLy8V5gWry8uqytqra2s6OlouHg4HFyb4eJhIB/fMzMzGJkXkZIQVpcVcTDwp6em1JVTkxNRtjZ121ua2VnYmlsZoODgd3e3JKSkH19eZeXlo6Pjbq6ubCysa6uraampevr68LCwXl5dVFRTcjJx4qLiefn56qqqu3t7nV1cU5QSZ6fnmFhXUZGQV1dWVhZUtfX176+vdLS0qKioZeZlWZmZsXGw4eHhba2tvT19OPj411hXVVVUczMzPDx8I6Oi/n5+oKGgmNkYIqKh25wbGhpZX+BfUFCPMLGwklNSby9u7sACUlJRa6uq+vn52ttaZKTjnJzbqqqp1ldWbO0srm6t+Dh4JOVkaamo7Gyr5ucmvf392VlYWVpZXp7eNXU1Hp8eH2CeZmalqGintra2Pvv8GlpacDBv8nJx97e3O/v74OEf/f3+1laVfPz81FVUc/QznF1cdbW1D9AOebn5Pf38/v7+0lJQW1tad/b2+vv63Z4c+fj49/f3+vr53V5dcHBv76+u+Pj3+/z80NEPmFhYXFxbU1OSbKysYKCfW9waufn66qmpsrGxrKurpKOjtvX1+/v87q2tk1RTYaKhvv793V1bdfS10BBOvfz9/v3+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAHAP8ALAAAAAAAAnkAAAj/ABEIHEiwoMGDCBMKBMCwocOHECNKnEixokWICjNq3Mixo8ePIEOKHEmypMmTKFOqXMkS4cWXMGPKnNiyps2bOHPq3Mmzp8+aM4MKHYrxp9GjSJMqXcq06UaiUKPCdEq1qtWrWLM2lcq1a1GtYMOKHUuWrNezXcuqXcu2rduVaONCfUu3rt27beXqDYq3r9+/gI3uHTw1sOHDiBN/JMy4ouLHkCMfbkw5ouTLmDOvrcy5oebPoENv7cxZtOnTqG+SLp26tevXi1dThk27tu2Fshvf3s3bdG7dvYMLj/yb8fDjyAMXJ5y8uXO6ywc/n059bPS91bNrr3pd7/bv2jeI/x9Pvrz58+jTi+8uF7z76erjy5+/AeoAOvjz69/Pn86k/wAGKOCABBb433sIJkffggyuRxQdDZaX4IQUfhThhepBBSGGG1To4YcIcSgieRqKCOKJJ46oYokcouhihSqOyCKGL9aIYIwiznihjTx+hyOHOkbY45DV/YhhkA0SqaRzRl6IJINLRnlckxE+uaCUWPZGZYNW0pfll7ZtyWCX84Fp5mtiLkimfGe2iVqa9K0Zn5t0hgbnfHKqV+eemd0pX57p8SloZH7GByh6gyaaWKEZPmiiopACxmh6h54X6aV9TYpepeZh6mldmp7HqYSpfXLJJEm8MEYSDVhg2CcpTP/yhKpRNEBIghacMesLGDRwySeZhlreqOQlhQEIyCar7LLMNvvFFmKMRMgYTYQRCA55yKAGIBKwkMoWYwDbURo7NBHJspFE8oK4G12SwLnKPgDCGSGJ0UETLbgwCBpvxNBFt6lsMolJL6SrbBMgJNFuJggrG0kjaZz0ScHwIitvCjYlsYkfSOBQgQwy/BtICw9skgS7GqXRiLzoDqwRBpmwnOwDL2yUhMzKNiLssI62iNQXKgQt9NBEF200LDJEENIlkbjAxhUfwAJLDieckMMEOowQQgVhIHLrRoQgUQgBRgOiMEeZ6GED0Sf8ULNHSaTigSw2fDDFFCNUzQQTOjD/occiBoxB0hFXXDH0CG5EspEpbYxQxdBYLIKxSWNUUPjQZYTQAsooJWEAGrOMIHXeJ+wttSUwiLBCxBtNMsgEjxOttEZp5xB70DkwslERRqtAxc4k9kwjUiD0bvzxKiDdwUefkJAHBHXkoAINVVRvvfVXMHECKS7MrtEnCyhwwu1Bk7JJRyy4YbjQZSSyfEeEfIFGFVM4cP391dftwA+xnA3SChQgm9CYwAPBaeQSUrAE+bCABJSAoBDrI9ohULAS+dkAFgTA3/0IAAcpXIIjabiADsinAgVwJABLmAL5LLGAjTygBxEUmhaANx5ijScpxUOeDoeGNCB4pAGCkMIU/06wBhIazwF1EAIIOIICWZwghiq4QhE4QgghWGJoBCAAC+C2gDXUYHo02KEKJmADEWQiJCtQAPls0Ia3aUQWJLRBC03yiT7YYG1Es4QbzpeSPviACVcIow4VQASPGKAOJKSA/xSCgSWMb2g02KJGELEE+xHtBjR00FA2NLyj5FCMOuxhR5KAgyrooIigFJoD8PAFjkSCBwIMWgYr8ISNtIAHeAyaDWRArxOigQIOWIPRCgfFoU1gCU0ASRFISIMlYGAjYqCE0S5wkg4IgQJGw4IPuPA1k8SiB7kkGjGLxgZXcQQSlhyaEBqwEQtkQJBCowE1NdKIDDiOaI1whD73yf/PfvrznwANqD5tKB4cCi2LCEVo7xKa0OTJ4H0aScIQqhDM3hGzmEKzQQhusJFPcEEF4VybFl6WiEfK0gcj5cgTfqCCDBaNABcdZ9FOIIUleuQBEChaCQKwkTRQgQZQlGRJHlAFGxixfM80yQ5gadGYEjMESGDdRrYAT10OwZwZSYIQiGYDKTxgI3+IARNIuAOlELRDSImELBmaxSsazQZszeIHkgY2KFTBElXNqAJkAQYwHAJ5bmilRiKgh1i2lAIMoKBCFuAGw6rgB1jNyCQAUQXHytIBPegrGARwAoUWbQl85EgEZBHBDA6hlxn5BAvW4FihSgsJFFCg0U7AA5v/lqQCa8AobRnA21kgdAR48APnFNKEl6IhWhHd6tBOIIQE2OwAsCDfGhYpGOHtCClN8AEYghAIKOzhu98NwkzxgAMoeBe8EggCBGTQiI1kogcmPegJElEEcD1hVgnwQ0mLub2yptYAIB2aDSiwuYQk4Q33FBoektnRPrjBrQI+ARFusIX7ogAITQjfCIxGAAa4bCMd+EEEbUADLkQ2IZ9AAmuJ5lqRNEIP2FxoD4hwYpDs4BWWHUEMbrCDTtx3ByB4QBd9wNGOFJdoBDiuzZQrtBMswbYKSQIgoju0NSzlrElJARCSMAlCfCINYAZzFoo2gSCcLMxp+IQFMPCHCNTY/yBjeEM6m6yCIxjQIC+QgA8smwNAvLkgT5CFZfXgRoOwIASOfcNwEbIDPWyYaCN4hQaoKxBC7CAPE+gdDjoSAREflAZU+OD3VNxak0SiCvEtWg5IQemPeCAERutCLQ9CiAg0wRQeOTIWlZxctj3ZZlMmHw3+zBMsY6UDJJzCECYnkk8UwQZQ1OYDFj0QE2ihDVAcwSxSmhENFIJtVeiDVAkSAAbYbmg+2AJHzrCIwpHwB1nIyBkYC+GgWeIQuN5Ip0sLalGnltQsLkkUDkCDcBbNARzQArU5EgOi0aAODEiqQhZ+EF0flNdZZXLQnAxlAwcbksTeibGv0ggSTuAAUf8gyR80bu8q+IEjSOhB0T4QBNR6vN5Be0WhByIIYRKNDR3ZRAjKQEJSkKCjgwAq0dawaX17Wpb97ijAh9ZikDSCB0QrxB7YoMKhQXYkFoiBYQmgADuwxOKyxHiUWc5xYFM5niHXycitUnKinTzlI3kADeqdQRd0MyNpcEJesRAKSGykCXgw7Al6cIRxIwARJZizCnzgvYxYIBA0OAEWVcDt5CZ44z/4g9P5HWqpr5jqJUlFD+xXvRMc4BILiHHQyrCEnXvEFBmI4QRKgIizGxe5Gfd1xxEi5bcHbdhmta6QsFJ3Y6J8JEkQQRWgKIXed2QLoTAaFCgukAYM4vM5L7T/CQKBSKI1fSNAgAAUyzhrjvjBDQZfQ9UPsu9Pl37Upxfa/DuCgh9UVpVmpwF6QHTVQwBQNRKmIAQxNAVCUHkogXYtpXYGxna/FlEfB3fJt0mPQnIm93wiAQSvYDT7pxAMQEKwwAD5lhFNAAMKZD02sAYe0E1b8ArxVQV4YHsJ0QRDRz4EYHgekQKORDRMMAh/hxD1B3X392/5FzQjqG+zEEMhoAoIsFJdJzQxUIQdkYC6twRHtxIQmGTAt3bC53bCFnc5MXdV0XxCc3cjEQkhAH4+oDgf8QAhEEMn0AYMBnhcADuH8wrvQwgLYAVVZQPzBDYLUAiytXFgkIIdwQUQ/wQ5DCB6GXGELRV1+FdqIpEGUBAC41M9I1ABgvMJB0A+TnZGITEGMlBMXMB9IPGFEkh8FDh8B1F8ZZiBQsFJ18WBdueBIFFHhdCJ03cFB2BzHYF1RFMGscARWyAETJBXQyAQ7+VSQiMFWJgQGMAANKB4LMCKcMZUB/UKXzWJT1eJSThxU6d/I/EEUmBYTCABwPIJgjALc8Z0ImEBP+BYEyAFRZYSrhiGEziGFmh802OGOIGGVKGGQcOGIYEB0hdLWVSIHkEIMkBCrYAEBIkAe+AAhlUGUlBLOPABpFgE3CgQL+ADRjU0VTBFISEF0zRY40gANBAIHXEEYxNwIoEIPP8wVgUYAiqJACt3bkJTARdpEGxQNDQwATywAK0mEl8YBFQ0kctVgVl1gcc3lEChfEnCfB2IdyCRBFJQPUNzBQYQEp+wB9k4NB/QBVyZEabwA0ApNIuwBUVjCWzgjxkxBhwwVui2jx7xCQwgexsnCC4JRWiwCaYQAYiZmIoZAR0QAaMYVCJBCBIQAkZVPRNABHeGAHnAgwKgASLhAnhgNJZgCSIQBjxlEhD4WIiwmKzJmAmwjtfTdgFZi0lhkE6BkGPEix8xBglEPiHgmSHRBEs4ARVwmhvRB/J4PQb4A0Q3NDnAlxtBAhDgONbjAGrggB0BBXkFC4HgeAZBiUGzBkL/8AMZADLmeZ7mWZM2CRIoQAoQRgNMsAhSBY888HlXMAgi8QRtII1E4wAOwABQoG4kkZoqIAToeaDmyVqxKZVRRpUDaYtBgYvLp4vOt5a31wZ8KDSHYH02pgCGNQJC4F8bgQJgMAJ5lYhB4wAHwGzn5AasVz05IAKK9T9KN0AHIHFGOI4ZdUc82qM+ilFNqBCZ8Aq2U4BuMJYEMQYlEF82gAYf9hGB0FJHpQJVswSDIIscQaA+uqU9OlMM6nECiXy1iZVQopW7aKFZOAt6KTSygJ0cYQrqOXtCEG8dAQlSsKa9YwN52BE34AMvWgU5cABLqRE3kFvOGQRoWhDgmUrG/xOkCQEIEORuHwCKBUEI80M0ENACInEGgDCaU6oClpADUiABbqoRBMqoUYmlBUGLIAehMyGhWUmha6ibt6em5NOmItEBcaoCZTCnHjEJatCcvZMDVGCVAtGnf9png5oRSmCoQtNnOEp/OoqqIhgSKCAFWHA9ZXAARVhHECCsLYWf+SkCOZCtxzOaPpCMH3Gq1EqlX0p8DiqmSGGbTYGbCgkSpmCrQ4OrIaGrG+mrHgECQjSleGCKH4Gs16OsItGsMQSt4ohR7cqEvVgEswCMBNAD22gQKGRwlABR7LkAPcAEOqRAXOCdxBWxvSObUxmmxsoS9MoU9kqraYqnKsCvIP/hr5gDsB0hBmhgWUEzAkgwkgWBsNajsCHBsM4JCNH6ndMKqpbApVsKpCCRBmhQVbAgC+1lECngf0SjAOoamVvQs9RpPHeEAyaLEFoKtVvqpapKEKyKgWOqgT4jqwkpsxwxBvoqND9QqhrxArvqAIkQWh3RAXqQoQclBBz6EUrgotfDBHa7EV/grLhjZg+LRSHABkFQAZq7uZxbAURQAXtWNI76naQAjEUVBHaJAJ9wBD3QgsG4CEKLEGKQACIAqsejTYIwkqmZWZ3bu56LBoVQma33rrMYry0LF2R6JWZaoSLBm1D0myIRuYYFC0TQfvDTRQanAg0kEpswndeDBXv/KxILkFdTEAjcR4mm1QliYCD/kQJRgANniXofAQWN1WR4oKkI0QGz8JYqQAoGSxIWsAMS0AOedYxqYL0ni2RsEADs+x9iYAolAJArS5vzmrxesryzmqgbgUJFswYv14uCUKNB8wGCGhJJEMFEIws+JBIvUJ/XYwlL4FwhIX1EMwVzpBDoSwMScJF74KHrCUJsYLo5EAIrkAQBMAZInMRJsAMhwL8q0AcpMS3pYzxuMLoI8IVEUI0GoVUS3KAs66oyAatlSre5qcEaMVn/NzRQ3IvSF0N1gARanBFiIANIFgTs1Lw5RTRV0HkesQRGcwSDaX/+Zo5LqAJWPBAJ4J4k/xQCENDIjuzIsGY0eTDIdPQCOIBRfcaN/bhkXQymFHwUL7sUMWvGGWECLCA+RLNsIHEJeUw0awwSDcByBCACxOgRKJAIJMQEgAwSY2CSRBMKgoXDL2mJSoiJHQG/b1U1yrzMmmc0bgCdJ0EIfQABqTYCYGCcCbxrqbvFsUiGrRq3t7iBdLeVI/Fe5io0eiCgHsHEjuUDSiASsYxkIvCkHwGIqwc5IoDAu1O/7EOplYuElIwQKVbIh4wAgdfMRaNB1sNhJyCYLJEGi+DDQmMJQtCFKvh7nJyq3gy3FSy3nTTOZzoSf9AGCT0HICEB34aWFYCDGxHPWDTPJAECawCuKv9QCG2LEKQlhAfAijlcjih2jhLLp+uIsj+nzydBAqSAp10VjheNZK84i908m9/c0eE8tyDNvCIRBUGQxkFJz5JljEKzBh9AhPAsyzA9EiV5cHtgAh4RATyA0McHBaMnyKZnzBuxCD4bsZbwziyBATIAkhmlj4eH0b2m0VLN0aBswWWCwXVLyqmlBC1VNK+8EYFAQg4gBXz8Q2bt1R5xCRIgPrdDABxg0RtBBFD0n4yYED0d0Acx0HadVWxgcDhnPJYgkARwAixwtiSRArJQfrpECjctEJtc2E1GvFtsvGAcE2KsvGR8ryFhCjBAQpZACnSqEQnwCjF0lGDg2Arh0gf/ddZtCKrk4wAVcMcawTuphgUiIFrD7NMCDdSG3BEGEJpEAwMSsACBkN/6vd/57QIVkL1LkNonkQlSUKStJwPVnc0Xt82rGtUTPNWJ7dG5eNUZTBKfcAEjYFkoqBE7IAXRFgo9GRLeLUvgLRJJQATiPTSWsAhm+AUuSjRYIAX/K8ykx9oG4do/nBE48KEQMAcR8wlAHuRC/o6bYFmWwNSD1S7/HUNMUHOD7dQM7rYO7sWfXF0SPqEU3tglEQFLgAVIRgBvgOQG8QV+XDRlwAC1rNnyzNlzqKAqbgmAkJkFEUI84MQKQAWc1t42XhA4Lr8aAQRqYFhYMAvYnFX3iGSL/5DmBpEGQUAFM14QYiABmUeKXZClhB18hv3giG3lVf3RaUjOJREG2QtSUoADDyBxn4ACSoADQ213r6DO8JwBa05HSFA1a6QCSyAB0DIQafACLeAE32pES6Do0spvEhDlA9Hn6HicPhfWXRDHix4G0kM0PcC3BGECGWAJieABR0ACwPcJSdACMRACKAqqevDBpnrpYpjpVF5lx6sSoawUo2wSnh1dJEQAliAFaLAIB4ADi8AGhcWfQYMFFGAEJpEGb8CDQcCi6egEGjlTBZoH/b4IgMAAPvBEcwkBwU0QL8AAMUUDOMDwAt1Fry3QXbCRPvDoGZEAxUQAmX0QKFACWf+0eEIgAoPgAV1wABWAB5bAXz/A3cKt7v8IOUug8gYxcAK5Bu+eEvGeFBFgcpRrEihQAYaLRf7pAFeQNz5LREew9AORBK8geQwg5yMRAZTQWUZkCWVQBi1VBk+U9hs1h9lHNDJg1DfuAoVsdhoBCSSNRbNg9wZ2ADRds8sqEBFACrFkCf55R/55BUYUacC5ESBw76i7ZCskAHJ4l2xAs1VA9j7R9Ejx9JD2AwKen3kwAu5GrQpwAdDOf69As4ibElnwA3dErVkUWCABYEUjBSxdEBZQgqKrEWfgBDi3BhLQ+gfxBeUOUsGs2ojPqGUA8shOEJnwUm9g3mtHQgrg0Bn/0QgyAH4qkLVUHaHiXBVfgD8nkAHibxIYgASwlEVg2TvWQwCoDwOrgxI7wAEEWD1XUNEqMQYA0cWGDQcqDB5EaLDKQksEqiQCgUDiRIoVKWpZs1BjlSUBLH78JGQjwz0fK2oJQUCFxhOFdpiEKTFCKIcj3zSIiWAFhCsLE/40OBCPCww5KxpgMrJKCAtGEWBYkkNpSaONMjhQ+sDpVq4VAXwFG1bs2K90NpxFm1bt2g1d3b61GGvEXLojqjSBGzMSmxM05tpQONLSCAI0QixqlNfkgyofytS1JEixyQYtRFaZq1LpFSw5LCngscBU3j45JtStU6WD009S6s79ECjn/xNKH5i8DoEC7otEjl/rMJDzyCwCf1cqJeDAwZUrS5Sk6ZqGRYHHdcvgNBrgVTAHr5E4TWUpx+sRkiefR0BWvXqzbN2vRR/fJBI8EOzfd5NKPsUnqdCEANAgWAYcgQYDIZgFkC1S2E+iOaRQoL77QviuQYnGmGOJHnxYQwUCJgBxBBUMCyGUPXb4RDEDALwPAhWkIMEpFJagoUUICsFBjJjmUMANN2yUJQm4JuGCABvtY2CSmCKQYIlQQimkCkumGBCWEwzykZRYXngrhUAIkBC/LJxKQAgKwoSgChec0qIHNO1jwcK31qMzrPbew7MtOeVD5AE//3zghif2RACFCP++4CKRJaRgFAYhGODiAVPOkPOTDgIF9IsvViM0gE00WEQIRhnVQ4gKjMikA+gUS6MRTQFV4gGPjEqiiVgBvQERHU0iZAsNAPXzCxCaesuECH4F9gEtOsmpgQBImEOCDPQYldElROgjgdHgsmCLW4Fl0KhOIvnWzxsicOqJL5J9IEZCt6oz3jvzdO9de++14IknAgigkwBQSILYewf+KAUU+PX3BRSiWJXgmFJ86xNCHJaoYaPEQGGMMfztZIwnJrGYYpFHlijeOuelFz6SV2a5ZZdfhjlmmWc2mU6UU05rZp135rlnn38GWs6a17sZ57OCRjpppZdmumlCh2bPaLb/nKa6aquvxrpnqMkq2uisvwY7bLHHhmvrsbrGmWy112a7bafNFgvtlN2mu2677x4ZbjulVhlvv/8GPHB49S6Lb7UERzxxxfEmvHDD0Vo8csknz7pxAOSml3LNN+fcZ8sxz7Nz0UcnXeTPH4e8dNVXZ/2801HXs2UxGkgB4olmT2FiiixI4YyQLWgAZIrS6F1gBBqgPWQEPkE+XIkIOSMF6aevnSITmk+hATFsB+kMFDpJQneKZm/Adguip376M4gV45LsPxIjhUm4j1gMDJIQkv7daae+fLeyT9/05keRAPZOfBYRQxIC8IRdWYR42uMeITCQggZK5BOTQJ5FLnEG//+Z5AxjOFgU9DcRQkyiekZJwyQ6gYIzXGIrKUhCJ55gPBJGIQWXoN8nsocB5eWtcaDDk8teMAQpCKEPFSFCImTRgor0QQowQIILJXIJFgiBFCyw3RfYIAU2bCsCakiEEBZgkRXIYglvEN8cfCAEISTCjSXIAJcmEoklkMKNS4gBErZggo8EAAlS8JEPKuAuiQSAiCW4wERwUAI3ttGNYQxBC1I0h0RIQQZaoYgGrMiGBCjmCSx4AwxC4ANZhEE3FkEBFUqwhEfWcQtdSQIbHPVIWpbglYWUBSMfKYQQ+EF/TzhCBvCAhxAwABJKqkgmEqGHLsxKIntYQgkWIUWJbP+iBKT4QSYokgQnQIANcqwIBjRZCB9JYQ/bqsgnJECKN+DlYVlwwRJ84AM9iAAEB7RIJ44ghCe5oQJfoBRFlLDKDFRoIg9gwBIy8BKXvQ51LhtDBUQ0Roq8QgVu8ENFXICFnozJgheggSUG0TAQLKEMeEDXUw5AAAIswiIiUEEhEjmRC3ygCgM5CAESM5EVsJSlHiJACC5Aw038gDnMOUEIgjORMfzAATSgCgKEcFSq9qQGSEjRJBhQhSvIIKAIuAQOrpCDKOalCUvgKleP+gaP8icGNwWMQUbwha48AQZ2UetRb4pJBHSgBwmhQTAWQD8QSOEENTnBCdbghJROhAT/mGGD8bigAAKggZoIAIFBcnAAZBbqFR8ghZAqEgFKDORKA7EBKbSQQzbYoAdzyMkFOLCQmlxhBIsQrUUiYVifJrYQDGCoRJIQBEtYogIHZIMKLJGjlzn0cS47Aw4mUIilToQUKgiFNinChSuVoQtFkUgYrqAAJk6kAzJgghTAmQAVlCEIp5SIBd6AhTaAVyI1vcIs2MjGJYATAUW4ggNCEUYpVAEWbtDu8xYwAhtAAAdhEIEMIkGRSXRhAqRI8CCKKAQOGIQDMpCBGy4AMVMcYgQ94GsmpJADBowhLzugLAH0MIQ+eAAPKnCAEDg1EW4SYA2k4C8HOsmVJKhBDxlY/0IIxqsHGQhBD7dEgCn+GoIMsFEGa4gF9zLxiikQgBQ4uIAIQkAYMPh3B1XIARoqogQenAAHB8zEQWigH4k0QApMIIV9JYKCCkzAATwAhCC4QIqxSsGdFCGCa+lskhb4wBIqKAEXWEAEH9igDkPo7EQS0AZYqAAGBzgCGnqQAwKAwcUTeYIegmqHiWxBCliYRW5b5lzDQXcQsJBBWyVyXTwkWCLcNUgZ+NoCS+CBruZFrxTQ+QQn2IAHK6AICGZhCUAYr6ZTMAAhtE0I50mkCCrgBAssUMIYFIgLAnsBGCwRihuk4RNpIAT3GoADWAgBERO5xLgJMQdLPFvbFmjYJ/+g0IMTvKEoaYBCccr7FkJkwCFvaIQJ3p2FJYx1EN1OQgU+AIbw/buHMdn2JdjggCXckxANaJiUVcCGbRNCDBab0QlGUAEUuDsNX3DDBK4w4olkAc1qpggkQuGAPmj5IBMIgmhTcOfQVmQBKjgBDDJhcxSAwQZp7vYn0KBomARACIABRLzf/QUOJLboFEGBLCzhgAokQeKEgAQNOp3liaRBEIlFg2i74KGMwozWfHPZJG4thE1UhNcR2e6VDCKDKEiE2Hi4AUXOm150fqIPNiDAmibighEd+r4fmMARYfJtwUIsFiGgABLE1wEGYEEWjbXIvOsNZYqEwQZ4KIJJMJD/gQlAHgEJ4MEI0DAouOwgBCfAA+0RoIFXsBT2GYcFA5w5mSSAwQGkQHxFVA6GmGy5DgJAp0QMIAUGBAK+Pk9zRVIRCizQfSJxRogGJLJ0PMv6CWjAihIqkgRZGKm6y9u6Hlg0i0CCHiAAKQiZWKCBGgAE+MKsWWiFJfgDirC8V8gjWUuCq5ApBFCxHDC4mPk7qQm8wSs8iji8iuCuE2AAN8ACTHq8yEM2yqOITYAAS+iCgLKAHxgBHyA+mgK9MIgJ0qMKQhgEh4CChkk3LHADQRih46E3IVC+8Lq9/6PAIoCAMoiBMZCAMgiBAXQLQfgrBrCIT6iAD9EA24G+GHBA/8WovuvLPopQuRiACUKQAAWogiHAp9yxCPQTgYq4AR5wAPeTiDjDAiFYAiaghEGhv6bjKTwggB+YQArsgytwMwoMQC+kCDQggBPog5AhASlwtgSzgMlSgUWgoXj7iDTQgsQSgSigArvQPxD8IdiJnZURvHorQetSATx4QwTgAvHIhB8gACGglDAoNhiUiMlTNop4gdaTgglDgE2IigrADh90gCC4gUC5AV37LxVgwCzYAij4LDeARok4g0WYi1cIhASooDp7wihEANvDAyrcHTXoPQZQASZIOsU4gCooBFaziEGoghNQPR6rgDKQggv4ghtQAkSgISKzPuz7CJUjhf9IWEgNAIHOagAZOClMNAmfK4ND0IIbIMkm8IAQsAFB5MAqqAMW0AIfmIDcW0RZYwHlQoKHbAICyAEcsB2t47qPmAQ0wAIs2CkCOgCoU4WJwAAGcIBZQEanmAQRmIAqkIElmIADqMbmmkXYGcF648YT3C4sqAIL0IJCsIHcW4Hbe0plDD9CWIAJUIGZYoGFeMrPUwAdyAGDIIDjoogiIABLaA4OYAIHIIAuaMcEmAXlsIIeYIQhmwjZg8KPkEd6pIgHYEEsmICSmwxSIAAf4CuKWIQqcAA7EB9uUoDM2MQf8C9YishelAiVQ4gcWIIEOwMhYAIOgMeP8LnkqAMVOKr/xFIBlcwElnQBE0CDMhCAF7gEUqg/ijgCzlgAfPq9gWy7ifBJATSJF6AES6gCkKAC5ohFBEgCq5SCe3ueLWiBOViBFdACWZOIJlCuuagC15y1rXyolrlFGQiuXdvFXgQ2FNnOVyDLEfC9GFxGiriBoeQCiWADWFgD2Pu8i6IlLrAYvyQALBiBR4O0bms1NKCBoawDKbgB24FMeJzMmDABQCiE4qi2yZgqH6DP0HQAFihNJzAIKcgAJPOANYRIN5xIA1SAHM0AKQiCxjqDDMgBDvC1mPC5E+iBJdgvIcADwBTOxliTB9CDlrSAQ2REiWABG8CC6LSIMeABG3AC+LpO/49EgKbizh4kIbG6gkVLAtuUAihDAUDIy4NwTUJwgRoYSAng0Iayz+fCz0GYglCABMPrTxS8kldSAgWY0T4g0LVMtvDrK1lwABnohEtQA1igBPdEgJrayR0g1Sw4tYn4tg+ogBYQM0s4BDfdHT8QAQIogzJIBGZxx9mTzCnMiR3AgynQzMkQgSroAdGrCA8YSBo1SDx7AFJFhBeQzq1oQ4m0CCkjgERohB3IAkTYAWo6gxIYAR6oS5jwuRH4gSzQ1h1ohAUohPbTMiuVCDRQgR54giX4gCWQtQuQkoKsiC2oAu8SnzQ1iShwgsQCAg06AOaQP+F6gzLggPBMAjwdiP8qgABulIhIUC43sFhBJRwgeo8RnAACiBOKWIJFTTwViJE0YIATuII3sIQ2CM++qtSKcMsD05aU0IKPqClYgLbRU4ECOKIGoAS7KIImfIoL0IMa6IFyLNFdncecGINX8NTpg4sjKAQVEEOLWKkcKFqDVNXLYsPW/FEVcAKYsIB+rIKRqogUiABTOCCf08eKAIFXCMR3/QDNK6ydDIV7lbUVMVOq1YlNlABL/MmP0MQyWAH6iYCvg4DsEwMP6JCwex4S8IMymgIIyEXJkwUmaDGdCUGvaRkMGISpBEJ8UzUecMxfuxJ32QI3GIErKAMYiFm2tAg/sIsFoIKkICSKqKn/0AtCFQgGJICOPvCBK5AFPfuIIGACN+hZJ9RVizjRmOiAWZgCGYDQtwCB42uDxqOICPgBgihK8ayA6DtV6hPbag1DvYCBGsgA7p2IVKAEGQgCdEI/oJsIDWC/Kr3biUiuR7swWQMCBiiDKlC+JGCAKyiEkbWgAIzZiuiCKiAANQgZxvgANPCvB4CBVsiA8pUIHICDUMjciWgE21RNzx3UWmuZNLgAP91HB3EDApiFdgQ2d0mDCgg2PaBUGawIaXSAV0BJWYDVz8O23xUs6EABSqgDH9hPi7AANLACCEBGyNzdiTAAXpVe6rXe8yAEAbiCEKACimiAhHUANPgq8SXf//iYVvqMw5h4glfIAR9Q4CijhCkYgSD4qvqtCPzFgrN7P3iVCESQAu78XwqkguKqAPeNRzSjhPC7zs9MpiVQiacMADWwLRawmKgtAxs8IBKICjcwz4rYgURgghKmmRMGPJcBAQX4jCBAhAgwAp6oAkqwCBdYXcfqAeVog5w1UEtFgBTAgQ+AXRpgQp39AEughAvoA0EwAgmYPtJbAOhIAyL4DBwQmDRoAUAAgQgAgRjgDB9oLF/WAcIbwz1wttyLCVPA4ut9ixXwkCo4gExohAf4ARqwgUIo4PHtXPRI4x+1AQ5ogT64AAMQgeewzhYIgTLYSxAAgj7QAwiWgszF4/+g4wEsEF6KGM4PYATbyYOFuDBERoAsuApLkIEveIEtOIAesAShSic06Ak0EIRYEAQoaAFclYguoCw8GIQt2IEiKAFL0IEYWM1POD1YIIA30IBGSAD6AAwZ4GCJCOVRXk2t7FhafBkx4IIaUIE1eIVXcAPmCIEl/oRBeLRPpsOQUhPbyQIhyIEDbaKamE+TqKmF6AEf8RHYY2dOGCwHeQUsyAD7uoQibAM94AEVyIFCeOaJ6AQBVgBjtc4gIIAeoCiYQOfqVWe3IAQcAIw1COzBTmlHNuN8Pg8UeAMfRd+emKd50oEjpAhCQAIaKAMa4AFA8hA8UALuObP0owhBQEn/Iqig4US63NoBGCAAPAviFnCDE6gCPJCCV1gDLKCAA+BQrTsIAAmBNWCD6UuBrbIBBdhqCKCBzEzdibAAF/ALMNEDPUBpS7DgERphqDbhqebKlzkDJPAplqoCIVhSBDiDPDDD7vWBhZAA21GCQCYFXo5GtaYBWWjq+4IFA0kI2IOCxjgA0ZoESjgBHkjUKZIAlmWOehaES1a7KjiCMQwCgwiCnIgAHqgBIdjYt7CAPvirg7CByLSIJCCCCQDtyTCFqw3WiniBEPCJg6iBPaAfQvCDNrCBoyIAWYhCEKABB/iB6cOBhUCD3qaBHBCB3PoEJBgzPZhiBEiDLfgBDqdE6hjQgof8hGENchWwAQaAVavugbzCAjAI34pIgznAgyRnjgNUgod8P+EuBM/zO1MWQZj5BBT4glgIgzAgAT8vFFIF20mIgAhwQBMYgx3ogGgVT3XNtIqYBFIFdVKNAO759B3Q8hfYAbcdnjGAhD4wABAoY6UkVVBFACAg1QVf7QjIggAw2i5JgD7oA0h4AT4yiU8P4rwgBFCn9U+IgFAHdeQVb0Twgz7QgBfoIUJodg5+AlDnHjGYdTuXhB14gSbEdi0QhBXYgnakiEt39h0A3OURAxCY9lQYg48bny0wAAOgd01/zEbw91gPCAA7',
    profile: 'Hello',
}


const PostState = {
    user_id: null,
    image:null,
    content:null,
}

const HumanForm = () => {
    const [state, setHumanState] = useState(HumanState)

    const handleChange = e => {
        setHumanState({...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = (body) => {
        //postHuman(body)
        localStorage.setItem('userinfo', JSON.stringify(body))
        const loginfo = {
            'user_id': body.user_id,
            'password': body.password
        }
        localStorage.setItem('loginfo', JSON.stringify(loginfo))
        setHumanState(HumanState)
    }

    return {
        handleChange, 
        handleSubmit, 
        state, 
    }
}
const AnimalForm = () => {
    const [state, setAnimalState] = useState(AnimalState)
    const [loading, setLoading] = useState(true)
    let history = useHistory()

    const handleChange = e => {
        setAnimalState({...state, [e.target.name]: e.target.value })
    }
    const handleChangeNum = e => {
        var NumGender = parseInt(e.target.value,10)
        setAnimalState({...state, [e.target.name]: NumGender })
    }
    function handleImgChange(img) {
        setAnimalState({ ...state, ["image"]: img }) // TODO Base64？？　or そのまま？？
    }
    const handleSubmit = (body) => {
        const addData = Object.assign(JSON.parse(localStorage.getItem('userinfo')), body)
        console.log(addData)
        //        postAnimal(TestAnimal)
        postAnimal(addData)
        .then((u) => {
            localStorage.removeItem('userinfo')
            loginForSignup(JSON.parse(localStorage.getItem('loginfo')))
            .then((u) => {         
                localStorage.removeItem('loginfo')
                setLoading(false)
                history.push('/main')
            })
            .catch((e) => {
                history.push('/error')
            })
        })
        .catch((e) => {
            history.push('/error')
        })
        
    }

    return {
        handleChange, 
        handleSubmit, 
        state, handleImgChange,
        handleChangeNum,
    }
}
const PostForm = () => {
    const [state, setPostState] = useState(PostState)

    //
    function handleContentChange(text)  {
        setPostState({...state, ["content"]:text })
    }
    function handleImgChange(img) {
        // setPostState({ ...state, ["content"]:" data.content "}) // TODO Base64？？　or そのまま？？
        setPostState({ ...state, ["image"]: img}) // TODO Base64？？　or そのまま？？
    }
    function handl_user_idChange(user_id) {
        // setPostState({ ...state, ["content"]:" data.content "}) // TODO Base64？？　or そのまま？？
        setPostState({ ...state, ["user_id"]: user_id}) // TODO Base64？？　or そのまま？？
    }
    const handleSubmit = (body) => {
        // stateをbodyにのせて渡すだけでよい
        setPostState({ ...state, ["user_id"]: getAnimal().user_id }) 
        // console.log("state");
        // console.log(state);
        postPost(state)


        setPostState(PostState)
    }

    return {
        handleContentChange, 
        handleSubmit, handleImgChange,handl_user_idChange, 
        state
    }
}
// const UserForm = () => {
//     const [state, setState] = useState(initialState)

//     const handleChange = e => {
//         setState({...state, [e.target.name]: e.target.value })
//     }

//     const handleSubmit = (body) => {
//         postUser(body)
//         setState(initialState)
//     }

//     return {
//         handleChange, 
//         handleSubmit, 
//         state, 
//     }
// }
export default HumanForm;
export  { AnimalForm,PostForm};
