FROM mcr.microsoft.com/dotnet/core/sdk:2.1-alpine AS builder

WORKDIR /app
COPY MtgCardOrganizer.Api/MtgCardOrganizer.Api.csproj MtgCardOrganizer.Api/
COPY MtgCardOrganizer.Bll/MtgCardOrganizer.Bll.csproj MtgCardOrganizer.Bll/
COPY MtgCardOrganizer.Dal/MtgCardOrganizer.Dal.csproj MtgCardOrganizer.Dal/
RUN dotnet restore ./MtgCardOrganizer.Api/MtgCardOrganizer.Api.csproj

COPY MtgCardOrganizer.Api/ MtgCardOrganizer.Api/
COPY MtgCardOrganizer.Bll/ MtgCardOrganizer.Bll/
COPY MtgCardOrganizer.Dal/ MtgCardOrganizer.Dal/
RUN dotnet publish ./MtgCardOrganizer.Api/MtgCardOrganizer.Api.csproj -c Release -o ../dist


FROM mcr.microsoft.com/dotnet/core/aspnet:2.1-alpine
WORKDIR /app
COPY --from=builder /app/dist/ .
ENTRYPOINT ["dotnet", "MtgCardOrganizer.Api.dll"]
