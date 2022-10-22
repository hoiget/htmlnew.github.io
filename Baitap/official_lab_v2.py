# Học thêm tại: https://dash.plotly.com/

# Run this app with `python official_lab_v2.py` and

# visit http://127.0.0.1:8050/ in your web browser.

# BẤM CTRL '+' C ĐỂ TẮT APP ĐANG CHẠY

from re import X
from dash import Dash, html, dcc
import plotly.express as px
import pandas as pd
import firebase_admin
from firebase_admin import credentials, firestore


# TẢI DỮ LIỆU TỪ FIRESTORE
cred = credentials.Certificate("./dtdp-c4d5a-firebase-adminsdk-8acrd-dd7075c02b.json")
appLoadData = firebase_admin.initialize_app(cred)

dbFireStore = firestore.client()

queryResults = list(dbFireStore.collection(u'tbl-20042221').where(u'DEALSIZE', u'==', 'Large').stream())
listQueryResult = list(map(lambda x: x.to_dict(), queryResults))

df = pd.DataFrame(listQueryResult)
df=pd.read_csv("orginal_sales_data_edit.csv")

df["YEAR_ID"] = df["YEAR_ID"].astype("str")
df["QTR_ID"] = df["QTR_ID"].astype("str")

# TRỰC QUAN HÓA DỮ LIỆU WEB APP
app = Dash(__name__)
server=app.server

figDoanhSoTheoNam = px.bar(df, x="YEAR_ID", y="SALES",  title='DOANH SỐ BÁN HÀNG THEO NĂM', color='SALES',
labels={'YEAR_ID':'Năm',  'SALES':'DOANH SỐ'})


figTiLeDongGopDanhSoTheoTungDoanhMuc = px.sunburst(df, path=['YEAR_ID', 'CATEGORY'], values='SALES',
color='QUANTITYORDERED',
labels={'parent':'Năm', 'labels':'Quý','QUANTITYORDERED':'Số lượng sản phẩm'},
title='TỈ LỆ ĐÓNG GHÓP CỦA DOANH SỐ THEO DANH MỤC TRONG NĂM')



# Dữ liệu truy vấn 
tongDoanhSo = df['SALES'].sum().round(2)
doanhSoCaoNhat = df['SALES'].max().round(2)

#Tinh loi nhuan
#1 Tính total sale
df['TOTAL_SALES'] = df['QUANTITYORDERED'] * df['PRICEEACH']
#2 Tính lợi nhuận
df['Profit'] = (df['SALES'] - df['TOTAL_SALES']).round(2)
tongLoiNhuan = df['Profit'].sum().round(2)
loiNhuanCaoNhat = df['Profit'].max().round(2)

figTiLeDongGopLoiNhanTheoTungDoanhMuc = px.sunburst(df, path=['YEAR_ID', 'CATEGORY'], values='Profit',
color='Profit',
labels={'parent':'Năm', 'labels':'Quý','QUANTITYORDERED':'Số lượng sản phẩm'},
title='TỈ LỆ ĐÓNG GHÓP CỦA LỢI NHUẬN THEO MỤC TRONG NĂM')


figLoiNhanTheoNam = px.line(data_frame=df, x="YEAR_ID", y="Profit",  title='LỢI NHUẬN BÁN HÀNG THEO NĂM', color='Profit',
labels={'YEAR_ID':'NĂM',  'Profit':'LỢI NHUẬN'})

app.layout = html.Div(
    children=[
        html.Div(
            children=[
                html.H1(
                    children="DATA DASHBOARD-20042221_Đặng Thanh Đại Phúc", className="header-title"
                ),
              
            ],
            className="header",
        ),
        html.Div(
            children=[
                html.H1(
                    children="REVENUE:CURRENT MONTH", className="header-name"
                ),
                html.Div(
                     
                    tongDoanhSo,className="so"
                    
                ),
              
            ],
            className="mycard1",
        ),
         html.Div(
            children=[
                html.H1(
                    children="HIGHEST SIGNUPS", className="header-name"
                ),
                html.Div(
                    doanhSoCaoNhat,className="so"
                ),
              
            ],
            className="mycard1",
        ),
         html.Div(
           
            children=[
                html.H1(
                    children="TOP MARKETING STRATEGY", className="header-name"
                ),
                html.Div(
                    tongLoiNhuan,className="so"
                ),
              
            ],
            className="mycard1",
        ),
         html.Div(
           
            children=[
                html.H1(
                    children="MAX TEMP: CAMBRIDGE", className="header-name"
                ),
                html.Div(
                    loiNhuanCaoNhat,className="so"
                ),
              
            ],
            className="mycard1",
        ),
        html.Div(
            children=[
                html.Div(
                    children=dcc.Graph(
                    id='doanhso-graph',
                    figure=figDoanhSoTheoNam),
                ),
              
            ],
            className="mycard",
        ),
        html.Div(
            children=[
                html.Div(
                    children=dcc.Graph(
                    id='slhd-graph',
                    figure=figTiLeDongGopDanhSoTheoTungDoanhMuc),
                ),
              
            ],
            className="mycard",
        ),
        html.Div(
            children=[
                html.Div(
                    children=dcc.Graph(
                    id='dm-graph',
                    figure=figTiLeDongGopLoiNhanTheoTungDoanhMuc),
                ),
              
            ],
            className="mycard",
        ),
        html.Div(
            children=[
                html.Div(
                   children=dcc.Graph(
                    id='lnn-graph',
                    figure=figLoiNhanTheoNam), 
                ),
              
            ],
            className="mycard",
        ),
        
    ],className="mywrapper")


if __name__ == '__main__':
    app.run_server(debug=True, port=8090)
