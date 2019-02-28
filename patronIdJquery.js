const fs = require('fs')

let pids = [
    'p1000515',
    'p1004554',
    'p1006877',
    'p1007002',
    'p1009462',
    'p1009546',
    'p1010143',
    'p1011084',
    'p1011151',
    'p1011654',
    'p1011844',
    'p1011969',
    'p1014036',
    'p1015393',
    'p1015418',
    'p1015583',
    'p1016147',
    'p1017078',
    'p1017296',
    'p1017341',
    'p1017785',
    'p1017848',
    'p1018974',
    'p1019200',
    'p1019745',
    'p1020107',
    'p1020458',
    'p1020766',
    'p1021010',
    'p1021457',
    'p1021557',
    'p1022182',
    'p1022864',
    'p1024053',
    'p1024403',
    'p1024758',
    'p1025754',
    'p1026077',
    'p1026135',
    'p1026302',
    'p1026702',
    'p1026998',
    'p1027352',
    'p1027693',
    'p1027790',
    'p1028310',
    'p1028653',
    'p1030097',
    'p1030325',
    'p1030328',
    'p1031000',
    'p1031360',
    'p1031391',
    'p1031552',
    'p1031763',
    'p1032046',
    'p1033085',
    'p1033119',
    'p1033548',
    'p1033611',
    'p1033682',
    'p1033831',
    'p1034866',
    'p1035557',
    'p1035617',
    'p1036480',
    'p1036604',
    'p1037254',
    'p1037705',
    'p1038469',
    'p1038471',
    'p1038527',
    'p1039337',
    'p1039686',
    'p1039696',
    'p1039742',
    'p1040694',
    'p1040796',
    'p1041508',
    'p1041883',
    'p1041952',
    'p1042822',
    'p1043156',
    'p1043588',
    'p1044007',
    'p1044441',
    'p1044514',
    'p1044915',
    'p1045088',
    'p1045640',
    'p1046384',
    'p1047861',
    'p1048716',
    'p1048962',
    'p1049030',
    'p1049689',
    'p1049988',
    'p1050328',
    'p1050479',
    'p1050618',
    'p1050649',
    'p1051230',
    'p1051269',
    'p1051513',
    'p1051517',
    'p1052149',
    'p1052222',
    'p1052540',
    'p1052812',
    'p1053098',
    'p1054669',
    'p1056647',
    'p1057545',
    'p1057620',
    'p1057792',
    'p1057870',
    'p1058376',
    'p1058502',
    'p1059021',
    'p1059169',
    'p1059420',
    'p1059933',
    'p1059971',
    'p1060252',
    'p1060344',
    'p1061686',
    'p1062101',
    'p1062545',
    'p1063043',
    'p1063411',
    'p1063762',
    'p1065757',
    'p1066311',
    'p1069214',
    'p1069509',
    'p1069648',
    'p1069904',
    'p1069932',
    'p1070524',
    'p1070579',
    'p1071257',
    'p1072146',
    'p1072502',
    'p1072897',
    'p1072983',
    'p1073426',
    'p1073776',
    'p1074242',
    'p1074461',
    'p1076425',
    'p1077365',
    'p1078713',
    'p1078812',
    'p1079258',
    'p1080393',
    'p1080860',
    'p1081439',
    'p1081628',
    'p1082104',
    'p1082129',
    'p1082254',
    'p1082405',
    'p1082420',
    'p1082456',
    'p1082973',
    'p1084041',
    'p1084866',
    'p1085093',
    'p1085135',
    'p1085181',
    'p1085193',
    'p1085625',
    'p1085820',
    'p1086275',
    'p1087663',
    'p1087697',
    'p1088147',
    'p1088177',
    'p1088792',
    'p1088915',
    'p1090324',
    'p1090448',
    'p1090869',
    'p1091493',
    'p1092080',
    'p1093821',
    'p1093888',
    'p1095445',
    'p1095449',
    'p1095655',
    'p1095832',
    'p1095897',
    'p1096517',
    'p1096753',
    'p1096979',
    'p1097214',
    'p1097222',
    'p1097306',
    'p1098147',
    'p1098569',
    'p1099546',
    'p1099572',
    'p1099610',
    'p1099704',
    'p1100063',
    'p1100321',
    'p1100501',
    'p1100663',
    'p1100730',
    'p1101877',
    'p1102132',
    'p1102274',
    'p1102503',
    'p1102707',
    'p1102747',
    'p1103102',
    'p1103232',
    'p1104559',
    'p1104841',
    'p1105303',
    'p1107002',
    'p1107608',
    'p1107971',
    'p1108098',
    'p1108178',
    'p1109549',
    'p1109558',
    'p1109680',
    'p1109755',
    'p1109827',
    'p1109878',
    'p1110266',
    'p1110897',
    'p1111205',
    'p1112590',
    'p1113221',
    'p1113901',
    'p1114068',
    'p1114483',
    'p1114496',
    'p1114723',
    'p1114945',
    'p1114991',
    'p1115046',
    'p1115194',
    'p1115937',
    'p1116405',
    'p1116674',
    'p1116893',
    'p1116914',
    'p1117462',
    'p1117723',
    'p1117998',
    'p1118962',
    'p1119436',
    'p1120498',
    'p1120499',
    'p1120706',
    'p1121329',
    'p1122147',
    'p1122232',
    'p1122294',
    'p1122597',
    'p1122659',
    'p1123609',
    'p1123671',
    'p1123758',
    'p1124442',
    'p1124906',
    'p1124956',
    'p1125071',
    'p1125300',
    'p1125344',
    'p1128004',
    'p1128445',
    'p1128618',
    'p1128634',
    'p1130409',
    'p1131445',
    'p1131871',
    'p1132273',
    'p1134163',
    'p1135006',
    'p1135164',
    'p1135471',
    'p1136139',
    'p1136335',
    'p1137123',
    'p1138014',
    'p1138737',
    'p1138827',
    'p1139434',
    'p1139778',
    'p1139782',
    'p1141218',
    'p1141539',
    'p1141711',
    'p1142780',
    'p1143017',
    'p1143679',
    'p1144506',
    'p1145305',
    'p1145599',
    'p1146834',
    'p1147533',
    'p1147899',
    'p1148577',
    'p1148805',
    'p1150535',
    'p1150943',
    'p1151984',
    'p1152260',
    'p1152443',
    'p1152545',
    'p1153107',
    'p1153215',
    'p1153574',
    'p1154031',
    'p1154318',
    'p1154678',
    'p1155196',
    'p1155203',
    'p1156018',
    'p1156256',
    'p1157372',
    'p1157409',
    'p1157436',
    'p1157621',
    'p1157714',
    'p1157829',
    'p1157971',
    'p1158021',
    'p1158516',
    'p1158686',
    'p1159407',
    'p1159635',
    'p1159869',
    'p1159968',
    'p1160059',
    'p1161740',
    'p1162523',
    'p1163590',
    'p1163606',
    'p1163691',
    'p1163760',
    'p1163932',
    'p1164507',
    'p1165064',
    'p1165148',
    'p1165991',
    'p1166191',
    'p1166394',
    'p1167408',
    'p1168609',
    'p1169229',
    'p1169264',
    'p1169675',
    'p1169824',
    'p1169885',
    'p1169890',
    'p1170504',
    'p1170607',
    'p1171118',
    'p1171230',
    'p1171924',
    'p1172707',
    'p1174486',
    'p1175783',
    'p1175805',
    'p1176087',
    'p1176148',
    'p1176374',
    'p1176645',
    'p1176851',
    'p1177388',
    'p1177551',
    'p1177799',
    'p1177984',
    'p1178375',
    'p1178586',
    'p1178638',
    'p1178837',
    'p1179030',
    'p1179102',
    'p1179540',
    'p1180209',
    'p1180486',
    'p1181455',
    'p1181819',
    'p1182112',
    'p1182230',
    'p1182234',
    'p1182783',
    'p1182854',
    'p1184218',
    'p1184998',
    'p1185131',
    'p1185280',
    'p1185679',
    'p1186366',
    'p1186490',
    'p1186683',
    'p1186693',
    'p1186922',
    'p1187261',
    'p1187483',
    'p1187724',
    'p1187806',
    'p1187932',
    'p1188103',
    'p1188195',
    'p1188196',
    'p1188710',
    'p1188966',
    'p1188981',
    'p1189030',
    'p1189987',
    'p1190106',
    'p1190328',
    'p1190855',
    'p1190902',
    'p1191435',
    'p1191448',
    'p1191764',
    'p1191949',
    'p1192057',
    'p1192395',
    'p1192615',
    'p1192662',
    'p1192742',
    'p1193001',
    'p1193017',
    'p1193553',
    'p1193782',
    'p1193856',
    'p1194037',
    'p1194550',
    'p1194792',
    'p1195623',
    'p1196102',
    'p1196418',
    'p1196708',
    'p1196872',
    'p1197240',
    'p1197889',
    'p1197922',
    'p1198189',
    'p1198559',
    'p1198950',
    'p1199269',
    'p1199422',
    'p1199601',
    'p1199892',
    'p1200117',
    'p1200676',
    'p1202100',
    'p1202645',
    'p1202647',
    'p1202832',
    'p1203083',
    'p1203207',
    'p1203641',
    'p1203749',
    'p1203922',
    'p1204169',
    'p1204374',
    'p1204617',
    'p1204739',
    'p1204754',
    'p1205244',
    'p1206504',
    'p1206574',
    'p1207129',
    'p1207336',
    'p1207339',
    'p1207426',
    'p1207745',
    'p1207928',
    'p1207987',
    'p1207990',
    'p1208123',
    'p1208361',
    'p1208731',
    'p1208853',
    'p1209272',
    'p1209387',
    'p1209491',
    'p1209612',
    'p1209839',
    'p1210090',
    'p1210425',
    'p1211266',
    'p1211463',
    'p1211483',
    'p1211679',
    'p1211788',
    'p1211815',
    'p1211833',
    'p1212130',
    'p1212545',
    'p1213010',
    'p1213444',
    'p1213445',
    'p1213513',
    'p1213760',
    'p1213854',
    'p1214099',
    'p1214148',
    'p1214314',
    'p1214349',
    'p1214957',
    'p1215235',
    'p1215237',
    'p1215585',
    'p1216359',
    'p1216943',
    'p1217033',
    'p1217050',
    'p1217082',
    'p1217412',
    'p1217476',
    'p1217547',
    'p1217806',
    'p1218257',
    'p1218600',
    'p1218601',
    'p1218697',
    'p1218806',
    'p1219109',
    'p1219235',
    'p1219258',
    'p1219305',
    'p1219365',
    'p1219460',
    'p1219492',
    'p1220107',
    'p1220277',
    'p1220369',
    'p1220623',
    'p1220802',
    'p1220926',
    'p1221037',
    'p1221222',
    'p1221373',
    'p1221609',
    'p1221764',
    'p1221906',
    'p1222036',
    'p1222148',
    'p1222173',
    'p1222370',
    'p1222393',
    'p1222573',
    'p1222645',
    'p1222962',
    'p1222963',
    'p1223080',
    'p1223265',
    'p1223306',
    'p1223383',
    'p1223453',
    'p1223827',
    'p1224276',
    'p1224936',
    'p1225179',
    'p1225198',
    'p1225204',
    'p1225564',
    'p1225598',
    'p1225817',
    'p1226046',
    'p1226345',
    'p1226352',
    'p1226600',
    'p1226690',
    'p1226866',
    'p1227250',
    'p1227498',
    'p1227577',
    'p1228120',
    'p1228249',
    'p1228657',
    'p1228675',
    'p1228742',
    'p1228766',
    'p1228875',
    'p1228886',
    'p1228929',
    'p1229079',
    'p1229109',
    'p1229290',
    'p1229405',
    'p1229571',
    'p1229719',
    'p1229761',
    'p1229985',
    'p1230438',
    'p1230651',
    'p1230689',
    'p1230733',
    'p1230739',
    'p1230846',
    'p1231224',
    'p1231336',
    'p1231523',
    'p1231528',
    'p1231719',
    'p1231805',
    'p1232045',
    'p1232088',
    'p1232464',
    'p1232505',
    'p1232517',
    'p1232534',
    'p1232651',
    'p1232687',
    'p1233065',
    'p1233203',
    'p1233360',
    'p1233633',
    'p1233807',
    'p1233897',
    'p1233939',
    'p1234369',
    'p1234373',
    'p1234499',
    'p1234931',
    'p1235019',
    'p1235060',
    'p1235141',
    'p1235220',
    'p1235352',
    'p1235586',
    'p1235780',
    'p1235868',
    'p1235967',
    'p1236062',
    'p1236229',
    'p1236237',
    'p1236242',
    'p1236318',
    'p1236642',
    'p1237045',
    'p1237119',
    'p1237331',
    'p1237406',
    'p1237529',
    'p1237550',
    'p1237552',
    'p1238018',
    'p1238317',
    'p1238513',
    'p1238605',
    'p1238819',
    'p1238954',
    'p1239187',
    'p1239359',
    'p1239377',
    'p1239490',
    'p1239533',
    'p1239535',
    'p1239620',
    'p1239782',
    'p1239810',
    'p1239830',
    'p1239926',
    'p1240067',
    'p1240081',
    'p1240428',
    'p1240509',
    'p1240515',
    'p1240723',
    'p1240842',
    'p1241102',
    'p1241121',
    'p1241575',
    'p1241796',
    'p1241844',
    'p1242156',
    'p1242215',
    'p1242247',
    'p1242280',
    'p1242459',
    'p1242947',
    'p1243131',
    'p1243163',
    'p1243215',
    'p1243346',
    'p1243462',
    'p1243465',
    'p1243479',
    'p1243555',
    'p1243590',
    'p1244072',
    'p1244144',
    'p1244516',
    'p1244589',
    'p1244595',
    'p1244945',
    'p1245013',
    'p1245291',
    'p1245294',
    'p1245318',
    'p1245510',
    'p1245619',
    'p1245659',
    'p1245980',
    'p1245998',
    'p1246091',
    'p1246312',
    'p1246324',
    'p1246413',
    'p1246431',
    'p1246566',
    'p1246824',
    'p1247164',
    'p1247477',
    'p1247489',
    'p1247529',
    'p1247565',
    'p1247638',
    'p1247721',
    'p1247881',
    'p1247897',
    'p1248057',
    'p1248082',
    'p1248262',
    'p1248379',
    'p1248490',
    'p1248618',
    'p1248672',
    'p1248793',
    'p1248803',
    'p1248862',
    'p1248870',
    'p1248872',
    'p1248941',
    'p1248993',
    'p1249000',
    'p1249015',
    'p1249279',
    'p1249284',
    'p1249321',
    'p1249629',
    'p1249660',
    'p1249669',
    'p1249882',
    'p1249944',
    'p1250007',
    'p1250121',
    'p1250136',
    'p1250155',
    'p1250191',
    'p1250228',
    'p1250415',
    'p1250434',
    'p1250830',
    'p1251339',
    'p1251506',
    'p1251555',
    'p1251560',
    'p1251645',
    'p1251657',
    'p1251680',
    'p1251692',
    'p1251810',
    'p1252032',
    'p1252290',
    'p1252455',
    'p1252984',
    'p1253130',
    'p1253345',
    'p1253414',
    'p1253930',
    'p1254163',
    'p1254205',
    'p1254309',
    'p1254352',
    'p1254369',
    'p1254509',
    'p1254548',
    'p1254625',
    'p1254633',
    'p1254856',
    'p1255031',
    'p1255241',
    'p1255452',
    'p1255541',
    'p1255552',
    'p1255679',
    'p1255908',
    'p1255957',
    'p1256236',
    'p1256239',
    'p1256432',
    'p1256480',
    'p1256600',
    'p1256778',
    'p1256890',
    'p1256891',
    'p1256958',
    'p1257025',
    'p1257165',
    'p1257259',
    'p1257278',
    'p1257308',
    'p1257408',
    'p1257607',
    'p1257795',
    'p1258110',
    'p1258209',
    'p1258220',
    'p1258222',
    'p1258443',
    'p1258575',
    'p1258583',
    'p1258612',
    'p1258614',
    'p1258655',
    'p1258684',
    'p1258770',
    'p1258852',
    'p1258881',
    'p1258933',
    'p1258969',
    'p1258975',
    'p1259054',
    'p1259273',
    'p1259297',
    'p1259333',
    'p1259372',
    'p1259438',
    'p1259516',
    'p1259625',
    'p1259652',
    'p1259868',
    'p1259909',
    'p1259912',
    'p1259997',
    'p1260045',
    'p1260067',
    'p1260369',
    'p1260482',
    'p1260554',
    'p1260631',
    'p1260644',
    'p1260772',
    'p1260801',
    'p1261212',
    'p1261345',
    'p1261359',
    'p1261528',
    'p1261538',
    'p1261561',
    'p1261629',
    'p1261851',
    'p1261882',
    'p1261978',
    'p1262013',
    'p1262072',
    'p1262545',
    'p1262623',
    'p1262754',
    'p1262811',
    'p1262890',
    'p1262968',
    'p1263028',
    'p1263074',
    'p1263171',
    'p1263236',
    'p1263239',
    'p1263261',
    'p1263282',
    'p1263298',
    'p1263386',
    'p1263425',
    'p1263440',
    'p1263547',
    'p1263608',
    'p1263743',
    'p1263746',
    'p1263788',
    'p1264174',
    'p1264175',
    'p1264178',
    'p1264188',
    'p1264282',
    'p1264467',
    'p1264510',
    'p1264547',
    'p1264589',
    'p1264702',
    'p1264934',
    'p1265014',
    'p1265052',
    'p1265132',
    'p1265196',
    'p1265245',
    'p1265262',
    'p1265267',
    'p1265296',
    'p1265315',
    'p1265445',
    'p1265489',
    'p1265811',
    'p1265813',
    'p1266339',
    'p1266525',
    'p1266582',
    'p1266673',
    'p1266831',
    'p1266933',
    'p1267009',
    'p1267016',
    'p1267275',
    'p1267475',
    'p1267482',
    'p1267602',
    'p1267608',
    'p1267610',
    'p1267630',
    'p1267876',
    'p1268091',
    'p1268116',
    'p1268175',
    'p1268262',
    'p1268470',
    'p1268595',
    'p1268723',
    'p1268906',
    'p1268999',
    'p1269073',
    'p1269157',
    'p1269356',
    'p1269383',
    'p1269540',
    'p1269587',
    'p1269597',
    'p1269778',
    'p1269843',
    'p1270057',
    'p1270106',
    'p1270325',
    'p1270468',
    'p1270484',
    'p1270523',
    'p1270526',
    'p1270563',
    'p1270624',
    'p1270662',
    'p1270788',
    'p1270849',
    'p1270941',
    'p1271116',
    'p1271137',
    'p1271170',
    'p1271339',
    'p1271552',
    'p1271619',
    'p1271669',
    'p1271828',
    'p1271926',
    'p1272067',
    'p1272068',
    'p1272178',
    'p1272179',
    'p1272382',
    'p1272423',
    'p1272701',
    'p1272760',
    'p1272773',
    'p1272972',
    'p1273165',
    'p1273179',
    'p1273264',
    'p1273457',
    'p1273506',
    'p1273595',
    'p1273613',
    'p1273671',
    'p1273717',
    'p1273820',
    'p1273943',
    'p1273985',
    'p1273993',
    'p1274081',
    'p1274119',
    'p1274123',
    'p1274150',
    'p1274198',
    'p1274289',
    'p1274303',
    'p1274389',
    'p1274410',
    'p1274428',
    'p1274481',
    'p1274543',
    'p1274651',
    'p1274687',
    'p1274705',
    'p1274706',
    'p1274712',
    'p1274714',
    'p1274718',
    'p1274735',
    'p1274778',
    'p1274841',
    'p1274874',
    'p1274876',
    'p1274886',
    'p1274954',
    'p1274989',
    'p1275009',
    'p1275013',
    'p1275022',
    'p1275041',
    'p1275049',
    'p1275052',
    'p1275058',
    'p1275081',
    'p1275125',
    'p1275175',
    'p1275204',
    'p1275207',
    'p1275233',
    'p1275237',
    'p1275342',
    'p1275353',
    'p1275386',
    'p1275405',
    'p1275440',
    'p1275442',
    'p1275462',
    'p1275464',
    'p1275473',
    'p1275498',
    'p1275505',
    'p1275553',
    'p1275558',
    'p1275560',
    'p1275581',
    'p1275584',
    'p1275590',
    'p1275617',
    'p1275635',
    'p1275646',
    'p1275709',
    'p1275728',
    'p1275729',
    'p1275737',
    'p1275765'
];


let queries = [
        {
            "target": {
                "record": {
                    "type": "patron"
                },
                "id": 81
            },
            "expr": []
        }
    ];

function main() {
    let exprArray = [];

    pids.forEach(element => {
        let operands = [element];
        exprArray.push({
            "op": "equals",
            "operands": operands
        }, "or");
    }, this );
    exprArray.pop();

    queries[0].expr = exprArray;

    const data = {"queries" : queries};
    const datastring = JSON.stringify(data, null, 2)

    fs.writeFile('temp.txt', datastring, function(err, datastring){
        if (err) console.log(err);
        console.log("Successfully Written to File.");
    });
}

main();

